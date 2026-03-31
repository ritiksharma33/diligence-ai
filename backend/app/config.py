import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv(override=True)


#this is called Encapsulation. It keeps your settings organized. If you ever want to add a Database URL or a Port Number later, you just add it to this class
class Settings:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    MODEL_NAME = "gemini-2.5-flash-lite" # Centralized model name
    #"Instance" of these settings.
#from app.config import settings
settings = Settings()