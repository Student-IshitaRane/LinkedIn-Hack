import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_api_key)
gemini_model = genai.GenerativeModel("models/gemini-1.5-flash-latest")

def get_chat_response(user_message): #technical interview
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

async def get_hr_interview_question(company, role, previous_answers, instruction=None):
    if not previous_answers:
        question = "Let's start with an introduction. Tell me about yourself."
        if instruction:
            # Try to apply instruction to the first question if possible
            question = f"{question} ({instruction})" if instruction else question
        return question
    base_prompt = f"You are an HR interviewer for {company} hiring for the role of {role}. "
    if previous_answers:
        base_prompt += f"The candidate previously answered: {' | '.join(previous_answers)}. "
    base_prompt += "Ask the next common HR interview question relevant to this company and role. keep it under 30 words."
    if instruction:
        base_prompt += f" {instruction}"
    response = gemini_model.generate_content(base_prompt)
    return response.text.strip()

async def get_hr_feedback(company, role, answer):
    prompt = f"""
You are an HR expert for {company} hiring for {role}. The candidate answered: '{answer}'.

Provide detailed, visually organized feedback using:
- Section headers (e.g., Emotional Tone, Empathy, Articulation, STAR Method)
- Bullet points for feedback (less than 30 words)
- Emoji icons for each section (e.g., 😊, 💬, ⭐, 💡)
- A summary box at the end with 2-3 actionable tips (use checkmarks ✅)
- Use clear line breaks for readability

Example format:

😊 Emotional Tone
• Positive and enthusiastic
• Could show more confidence

💬 Empathy
• Good understanding of others' perspectives
• Try to use more empathetic language

⭐ STAR Method
• Situation and Task described well
• Action and Result could be clearer

💡 Articulation
• Clear and concise
• Minor filler words

📦 Summary & Actionable Tips
✅ Maintain positive tone
✅ Give more specific results in answers
✅ Use empathetic phrases

Now, provide feedback in this format:
"""
    response = gemini_model.generate_content(prompt)
    return response.text.strip()