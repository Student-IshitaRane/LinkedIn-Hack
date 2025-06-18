import os
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

def text_to_speech(text: str) -> bytes:
    if not text:
        return b''
    # Debug: print the loaded API key (mask most of it for safety)
    elevenlabs_key = os.getenv("ELEVENLABS_KEY")
    print(f"[DEBUG] ELEVENLABS_KEY loaded: {elevenlabs_key[:8]}...{elevenlabs_key[-4:]}")
    voice_id = 'pNInz6obpgDQGcFmaJgB'
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "Content-Type": "application/json",
        "accept": "audio/mpeg",
        "xi-api-key": elevenlabs_key
    }
    data = {
        "text": text,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5
        }
    }
    response = requests.post(url, json=data, headers=headers, timeout=10)
    response.raise_for_status()
    return response.content