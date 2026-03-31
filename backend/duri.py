import os
from typing import List
from enum import Enum
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pypdf import PdfReader

# LangChain Gemini Imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

# --- 1. THE SCHEMA ---
class RiskLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class LegalExtraction(BaseModel):
    parties: List[str] = Field(description="List of legal entities mentioned.")
    deadlines: List[str] = Field(description="Dates or deadlines in YYYY-MM-DD format.")
    financial_obligations: float = Field(description="Total money involved. 0.0 if none.")
    risk_assessment: RiskLevel = Field(description="The risk level.")
    summary: str = Field(description="2-sentence summary of the document.")

# --- 2. FASTAPI SETUP ---
app = FastAPI(title="Advocacy OS Engine")

# This fixes the CORS error - it must be called on 'app', not 'main'
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. GEMINI CONFIGURATION ---
# ⚠️ SECURITY TIP: Never share your API key in public chats! 
# Reset this key in Google AI Studio after this session for safety.
os.environ["GOOGLE_API_KEY"] = "AIzaSyC7s6TNc5G_4W1uspq_HJiuEhz2oTJQdPE"

# Using the free-tier workhorse
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite", temperature=0)

structured_llm = llm.with_structured_output(LegalExtraction)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a legal assistant for an Indian Law Firm. Extract data accurately from the text provided."),
    ("human", "{document_text}")
])

chain = prompt | structured_llm

# --- 4. ENDPOINTS ---
@app.post("/extract", response_model=LegalExtraction)
async def extract_clauses(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a PDF file.")

    try:
        reader = PdfReader(file.file)
        text = ""
        for i in range(min(len(reader.pages), 5)):
            text += reader.pages[i].extract_text()

        if not text.strip():
            raise HTTPException(status_code=400, detail="Empty PDF or image-based PDF detected.")

        # Invoke the chain
        response = chain.invoke({"document_text": text})
        return response

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)