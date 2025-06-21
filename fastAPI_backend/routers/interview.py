from fastapi import APIRouter, UploadFile, HTTPException, Body, Request
from pathlib import Path
import tempfile, shutil
from services.stt_service import analyze_audio_with_assemblyai, save_assemblyai_analysis
from services.gemini_service import get_chat_response
from services.tts_service import text_to_speech
from database.chat_history import load_messages, save_messages
from utils.file_utils import ALLOWED_AUDIO_EXTENSIONS
import os
import json
from fastapi.responses import StreamingResponse, JSONResponse
import base64
from pydantic import BaseModel
from utils.audio_convert import convert_webm_to_mp3

router = APIRouter()

LAST_TRANSCRIPT_FILE = 'last_transcript.txt'

class TextAnswer(BaseModel):
    answer: str

@router.post("/talk")
async def post_audio(file: UploadFile):
    try:
        file_ext = Path(file.filename).suffix.lower()
        if file_ext not in ALLOWED_AUDIO_EXTENSIONS:
            raise HTTPException(400, detail="Unsupported audio format")
        with tempfile.NamedTemporaryFile(suffix=file_ext, delete=False) as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name

        # Convert webm to mp3 if needed
        if file_ext == ".webm":
            mp3_path = tmp_path + ".mp3"
            convert_webm_to_mp3(tmp_path, mp3_path)
            os.unlink(tmp_path)
            audio_path = mp3_path
        else:
            audio_path = tmp_path

        assemblyai_result = analyze_audio_with_assemblyai(audio_path)
        save_assemblyai_analysis(assemblyai_result)
        # Save transcript for frontend chat display
        transcript = assemblyai_result.get('text', '')
        with open(LAST_TRANSCRIPT_FILE, 'w', encoding='utf-8') as f:
            f.write(transcript or '')
        user_message = {"text": transcript}
        chat_response = get_chat_response(user_message)
        audio_output = text_to_speech(chat_response)
        os.unlink(audio_path)
        if not audio_output:
            raise HTTPException(500, detail="Failed to generate speech")
        # Encode audio as base64
        audio_b64 = base64.b64encode(audio_output).decode("utf-8")
        return JSONResponse({
            "text": chat_response,
            "audio_base64": audio_b64
        })
    except Exception as e:
        print("Error in /talk:", e)
        raise HTTPException(500, detail=str(e))

@router.get("/last_transcript")
async def last_transcript():
    try:
        if not os.path.exists(LAST_TRANSCRIPT_FILE):
            return {"transcript": ""}
        with open(LAST_TRANSCRIPT_FILE, 'r', encoding='utf-8') as f:
            transcript = f.read()
        return {"transcript": transcript}
    except Exception as e:
        return {"transcript": ""}

@router.post("/set_position")
async def set_position(position: str = Body(..., embed=True)):
    from utils.file_utils import POSITION_FILE, DATABASE_FILE, ASSEMBLYAI_ANALYSIS_FILE
    import json
    # Reset database.json to system prompt
    DATABASE_FILE.write_text(json.dumps([{
        "role": "system",
        "content": "You are a friendly interviewer. You are interviewing the user for an AI intern position. Ask the first question as: 'Let's start with a quick introduction. Please introduce yourself.' After that, ask Beginner-level relevant technical questions one at a time, based on the user's resume and previous answers. Wait for the user's answer before asking the next question. Do NOT end the interview yourself; only end when the user says 'end interview'. Keep responses under 30 words and be conversational."
    }], indent=4))
    # Remove assemblyai_analysis.pkl if it exists
    if ASSEMBLYAI_ANALYSIS_FILE.exists():
        ASSEMBLYAI_ANALYSIS_FILE.unlink()
    POSITION_FILE.write_text(position)
    return {"message": f"Position set to '{position}' and interview state reset."}

@router.post("/set_difficulty")
async def set_difficulty(difficulty: str = Body(..., embed=True)):
    from utils.file_utils import DIFFICULTY_FILE
    DIFFICULTY_FILE.write_text(difficulty)
    return {"message": f"Difficulty set to '{difficulty}'"}

@router.post("/set_interview_type")
async def set_interview_type(interview_type: str = Body(..., embed=True)):
    from utils.file_utils import INTERVIEW_TYPE_FILE
    INTERVIEW_TYPE_FILE.write_text(interview_type)
    return {"message": f"Interview type set to '{interview_type}'"}

@router.post("/end_interview")
async def end_interview():
    return {"message": "Interview ended by user."}

@router.get("/clear")
async def clear_history():
    from utils.file_utils import DATABASE_FILE, ASSEMBLYAI_ANALYSIS_FILE
    try:
        DATABASE_FILE.write_text(json.dumps([{
            "role": "system",
            "content": "You are playing the role of an interviewer. Ask short questions relevant to the user."
        }]))
        if ASSEMBLYAI_ANALYSIS_FILE.exists():
            ASSEMBLYAI_ANALYSIS_FILE.unlink()
        return {"message": "Chat history cleared"}
    except Exception as e:
        raise HTTPException(500, detail=str(e))

@router.get("/first_question")
async def first_question():
    try:
        # The introduction question
        intro_text = "Let's start with a quick introduction. Please introduce yourself."
        from services.tts_service import text_to_speech
        audio_output = text_to_speech(intro_text)
        if not audio_output:
            raise HTTPException(500, detail="Failed to generate speech for introduction question")
        def iterfile():
            yield audio_output
        return StreamingResponse(
            iterfile(),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=intro.mp3"}
        )
    except Exception as e:
        print("Error in /first_question:", e)
        raise HTTPException(500, detail=str(e))

@router.post("/talk_text_full")
async def talk_text_full(answer: TextAnswer):
    try:
        # Prevent empty answers
        if not answer.answer or not answer.answer.strip():
            raise HTTPException(400, detail="Answer cannot be empty.")
        # Get AI response text
        user_message = {"text": answer.answer}
        chat_response = get_chat_response(user_message)
        # Generate TTS audio
        audio_output = text_to_speech(chat_response)
        if not audio_output:
            raise HTTPException(500, detail="Failed to generate speech")
        # Encode audio as base64
        audio_b64 = base64.b64encode(audio_output).decode("utf-8")
        return JSONResponse(content={"text": chat_response, "audio_base64": audio_b64})
    except Exception as e:
        print("Error in /talk_text_full:", e)
        raise HTTPException(500, detail=str(e))