from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import process_chat

router = APIRouter()

@router.post("", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    return await process_chat(request.messages)