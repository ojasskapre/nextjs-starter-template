from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime

# this schema is for returning message from db as response
class MessageResponse(BaseModel):
    id: UUID
    chat_session_id: UUID
    role: str
    content: str
    created_at: datetime

# this schema is for returning chat session from db as response
class ChatSessionResponse(BaseModel):
    id: UUID
    title: str
    created_at: datetime
    updated_at: datetime

# this schema is for request to update a chat session's title
class UpdateTitleRequest(BaseModel):
    title: str

"""
Below schemas are related to request, actual message and response of LLM
"""

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    sessionId: Optional[UUID]
    model: str
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    response: str
