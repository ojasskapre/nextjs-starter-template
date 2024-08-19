async def process_chat(chat_request):
    user_input = chat_request.user_input
    # Logic to interact with OpenAI or any other service
    response_text = f"You said: {user_input}"
    return response_text
