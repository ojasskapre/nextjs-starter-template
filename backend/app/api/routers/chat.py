from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.chat import ChatRequest, ChatResponse, MessageResponse, ChatSessionResponse, UpdateTitleRequest
from app.services.chat_service import process_chat
from app.dependencies import verify_jwt
from app.models import ChatSession, Message
from app.database import get_db
from uuid import UUID
from datetime import datetime

router = APIRouter()

# route to get all messages of a session
@router.get("/sessions/{session_id}", response_model=list[MessageResponse])
async def get_chat_history(session_id: UUID, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    # Retrieve the chat session and verify the user
    chat_session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == user.user.id).first()
    if not chat_session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    # Retrieve all messages in this session
    messages = db.query(Message).filter(Message.chat_session_id == session_id).order_by(Message.created_at.asc()).all()
    return messages

# route to post a message to a session or start a new session
@router.post("/sessions/{session_id}", response_model=ChatResponse)
async def continue_chat(session_id: UUID, chat_request: ChatRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    model_id = chat_request.model

    # Verify the session belongs to the user
    chat_session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == user.user.id).first()
    if not chat_session:
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        title = f"New Chat - {current_time}"
        
        chat_session = ChatSession(id=session_id, user_id=user.user.id, title=title)
        db.add(chat_session)
        db.commit()
        db.refresh(chat_session)

    # Update the updated_at timestamp
    if chat_session:
        chat_session.updated_at = datetime.utcnow()

    # Add the user's new message to the session
    message = Message(
        chat_session_id=chat_session.id,
        role="user",
        content=chat_request.messages[-1].content
    )
    db.add(message)
    db.commit()

    return await process_chat(model_id, chat_request.messages, db, session_id)

# route to get all chat sessions
@router.get("/sessions", response_model=list[ChatSessionResponse])
async def get_all_chat_sessions(user=Depends(verify_jwt), db: Session = Depends(get_db)):
    chat_sessions = db.query(ChatSession).filter(ChatSession.user_id == user.user.id).order_by(ChatSession.updated_at.desc()).all()
    return chat_sessions

# route to update title for a chat sessions
@router.patch("/sessions/{session_id}/title", response_model=ChatSessionResponse)
async def update_chat_session_title(
    session_id: UUID, 
    title_request: UpdateTitleRequest,
    user=Depends(verify_jwt), 
    db: Session = Depends(get_db)
):
    # Retrieve the chat session and verify the user
    chat_session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == user.user.id).first()
    if not chat_session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    # Update the title
    chat_session.title = title_request.title
    db.commit()
    db.refresh(chat_session)
    
    return chat_session

# route to delete a chat session and all its messages
@router.delete("/sessions/{session_id}", response_model=dict)
async def delete_chat_session(
    session_id: UUID, 
    user=Depends(verify_jwt), 
    db: Session = Depends(get_db)
):
    # Retrieve the chat session and verify the user
    chat_session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == user.user.id).first()
    if not chat_session:
        raise HTTPException(status_code=404, detail="Chat session not found")
    
    # Delete all messages associated with the chat session
    db.query(Message).filter(Message.chat_session_id == session_id).delete()
    
    # Delete the chat session
    db.delete(chat_session)
    db.commit()
    
    return {"detail": "Chat session and its messages have been deleted"}

# route to empty chat session and messages table (only used via curl / Postman or any API tool)
@router.delete("/empty-sessions", response_model=dict)
async def empty_chat_sessions_and_messages(
    db: Session = Depends(get_db)
):
    # Delete all messages from the database
    db.query(Message).delete()
    
    # Delete all chat sessions from the database
    db.query(ChatSession).delete()
    
    db.commit()
    
    return {"detail": "All chat sessions and messages have been deleted"}
