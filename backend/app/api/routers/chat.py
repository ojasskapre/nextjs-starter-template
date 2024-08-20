from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.chat import ChatRequest, ChatResponse, MessageResponse, ChatSessionResponse
from app.services.chat_service import process_chat
from app.dependencies import verify_jwt
from app.models import ChatSession, Message
from app.database import get_db
from uuid import UUID
from datetime import datetime

router = APIRouter()

# route to start initial conversation
@router.post("/chat", response_model=ChatResponse)
async def start_chat(chatRequest: ChatRequest, user = Depends(verify_jwt), db: Session = Depends(get_db)):
    # Generate the title with the current timestamp
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    title = f"New Chat - {current_time}"
    
    # Create a new chat session
    chat_session = ChatSession(id=chatRequest.sessionId, user_id=user.user.id, title=title)
    db.add(chat_session)
    db.commit()
    db.refresh(chat_session)

    # Add the first message to the session
    message = Message(
        chat_session_id=chat_session.id,
        role="user",
        content=chatRequest.messages[-1].content
    )
    db.add(message)
    db.commit()

    return await process_chat(chatRequest.messages, db, chat_session.id)

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

# route to post a message to existing session
@router.post("/sessions/{session_id}", response_model=ChatResponse)
async def continue_chat(session_id: UUID, chat_request: ChatRequest, user=Depends(verify_jwt), db: Session = Depends(get_db)):
    # Verify the session belongs to the user
    chat_session = db.query(ChatSession).filter(ChatSession.id == session_id, ChatSession.user_id == user.user.id).first()
    if not chat_session:
        raise HTTPException(status_code=404, detail="Chat session not found")

    # Add the user's new message to the session
    message = Message(
        chat_session_id=chat_session.id,
        role="user",
        content=chat_request.messages[-1].content
    )
    db.add(message)
    db.commit()

    return await process_chat(chat_request.messages, db, session_id)

# route to get all chat sessions
@router.get("/sessions", response_model=list[ChatSessionResponse])
async def get_all_chat_sessions(user=Depends(verify_jwt), db: Session = Depends(get_db)):
    print(user.user.id)
    chat_sessions = db.query(ChatSession).filter(ChatSession.user_id == user.user.id).order_by(ChatSession.created_at.desc()).all()
    return chat_sessions