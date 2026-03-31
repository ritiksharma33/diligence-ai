import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv(override=True)

class Settings:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    MODEL_NAME = "gemini-2.5-flash-lite" # Centralized model name

settings = Settings()