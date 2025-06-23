import google.generativeai as genai
import os

gemini_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_api_key)
gemini_model = genai.GenerativeModel("models/gemini-1.5-flash-latest")

def get_chat_response(user_message):
    from database.chat_history import load_messages, save_messages
    messages = load_messages()
    messages.append({"role": "user", "content": user_message['text']})
    resume_context = ""
    try:
        with open("resume_context.txt", "r", encoding="utf-8") as f:
            resume_context = f.read().strip()
    except Exception:
        pass
    prompt = ""
    if resume_context:
        prompt += f"Resume Context:\n{resume_context}\n\n"
    prompt += "\n".join(f"{m['role']}: {m['content']}" for m in messages) + "\nAssistant:"
    response = gemini_model.generate_content(prompt)
    gemini_reply = response.text.strip()
    save_messages(user_message['text'], gemini_reply)
    return gemini_reply