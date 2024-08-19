from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_input: str

class ChatResponse(BaseModel):
    response: str
