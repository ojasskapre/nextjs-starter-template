from fastapi import APIRouter, Depends
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import process_chat
from app.dependencies import verify_jwt

router = APIRouter()

@router.post("", response_model=ChatResponse)
async def chat_endpoint(chatRequest: ChatRequest, user = Depends(verify_jwt)):
    return await process_chat(chatRequest.messages)