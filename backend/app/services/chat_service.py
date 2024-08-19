from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from fastapi.responses import StreamingResponse
import asyncio

TEMPLATE = """You are a helpful assistant. Respond to all user input with clear, concise, and informative responses.

User: {input}
AI:
"""

async def process_chat(messages):
    current_message_content = messages[-1].content
    prompt = ChatPromptTemplate.from_template(TEMPLATE)
    
    model = ChatOpenAI(
        temperature=0.8,
        model='gpt-3.5-turbo-0125',
        streaming=True
    )
    
    chain = prompt | model | StrOutputParser()
    
    async def generate_chat_responses():
        async for chunk in chain.astream({"input": current_message_content}):
            yield chunk

    return StreamingResponse(generate_chat_responses(), media_type="text/event-stream")