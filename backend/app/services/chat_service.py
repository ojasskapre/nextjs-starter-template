import asyncio
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from fastapi import HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from uuid import UUID

TEMPLATE = """You are a helpful assistant. Respond to all user input with clear, concise, and informative responses.

User: {input}
AI:
"""

async def process_chat(model_id: str, messages, db: Session, chat_session_id: UUID):
    current_message_content = messages[-1].content
    prompt = ChatPromptTemplate.from_template(TEMPLATE)
    
    model = ChatOpenAI(
        temperature=0.8,
        model=model_id,
        streaming=True
    )
    
    chain = prompt | model | StrOutputParser()
    
    async def generate_chat_responses():
        from app.models import Message
        
        full_response = ""
        try:
            async for chunk in chain.astream({"input": current_message_content}):
                # Accumulate the chunks
                full_response += chunk

                # Stream the chunk to the client
                yield f'0:"{chunk}"\n'
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            # Save the accumulated response to the database even if streaming was interrupted
            if full_response:
                db.add(Message(
                    chat_session_id=chat_session_id,
                    role="assistant",
                    content=full_response
                ))
                db.commit()

    response =  StreamingResponse(generate_chat_responses())
    response.headers["x-vercel-ai-data-stream"] = "v1"
    return response
