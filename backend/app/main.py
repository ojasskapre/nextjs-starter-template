from fastapi import FastAPI
from app.api.routers import chat

app = FastAPI()

app.include_router(chat.router, prefix="/api/chat")
