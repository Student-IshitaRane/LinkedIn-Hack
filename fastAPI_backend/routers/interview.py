from fastapi import APIRouter, UploadFile, HTTPException, Body
from pathlib import Path
import tempfile, shutil
from services.stt_service import analyze_audio_with_assemblyai, save_assemblyai_analysis
from services.gemini_service import get_chat_response
from services.tts_service import text_to_speech
from database.chat_history import load_messages, save_messages
from utils.file_utils import ALLOWED_AUDIO_EXTENSIONS
import os
import json
from fastapi.responses import StreamingResponse

router = APIRouter()

@router.post("/talk")
async def post_audio(file: UploadFile):
    try:
        file_ext = Path(file.filename).suffix.lower()
        if file_ext not in ALLOWED_AUDIO_EXTENSIONS:
            raise HTTPException(400, detail="Unsupported audio format")
        with tempfile.NamedTemporaryFile(suffix=file_ext, delete=False) as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name

        assemblyai_result = analyze_audio_with_assemblyai(tmp_path)
        save_assemblyai_analysis(assemblyai_result)
        user_message = {"text": assemblyai_result.get('text', '')}
        chat_response = get_chat_response(user_message)
        audio_output = text_to_speech(chat_response)
        if not audio_output:
            raise HTTPException(500, detail="Failed to generate speech")
        def iterfile():
            yield audio_output
        os.unlink(tmp_path)
        return StreamingResponse(
            iterfile(),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=response.mp3"}
        )
    except Exception as e:
        print("Error in /talk:", e)
        raise HTTPException(500, detail=str(e))

@router.post("/set_position")
async def set_position(position: str = Body(..., embed=True)):
    from utils.file_utils import POSITION_FILE
    POSITION_FILE.write_text(position)
    return {"message": f"Position set to '{position}'"}

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