import google.generativeai as genai
import os

gemini_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_api_key)
gemini_model = genai.GenerativeModel("models/gemini-1.5-flash-latest")

def get_chat_response(user_message):
    from database.chat_history import load_messages, save_messages
    messages = load_messages()
    messages.append({"role": "user", "content": user_message['text']})
    response = gemini_model.generate_content(
        "\n".join(f"{m['role']}: {m['content']}" for m in messages) + "\nAssistant:"
    )
    gemini_reply = response.text.strip()
    save_messages(user_message['text'], gemini_reply)
    return gemini_reply