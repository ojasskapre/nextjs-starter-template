from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import process_chat

router = APIRouter()

@router.post("", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatRequest):
    try:
        response_text = await process_chat(chat_request)
        return ChatResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
