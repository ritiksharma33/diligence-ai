from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pypdf import PdfReader
from app.ai_engine import process_document


#we reacted the router in a separate file to keep main.py clean
router = APIRouter()

# Notice `mode: str = Form(...)`. This matches the formData.append('mode', mode) in React!
#when the user uploads a file and selects a mode, both the file and the mode are sent together to this endpoint. The `mode` variable will tell us which "expert" to route the text to in our AI Engine.
@router.post("/extract")
async def extract_clauses(file: UploadFile = File(...), mode: str = Form(...)):
    
    # ... inside your try block, you can now print the mode to verify it arrived:
    print(f"📥 Received file: {file.filename}")
    print(f"⚙️ Operating Mode: {mode}")
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        # 1. Parse PDF
        reader = PdfReader(file.file)
        text = ""
        for i in range(min(len(reader.pages), 5)):
            text += reader.pages[i].extract_text()

        if not text.strip():
            raise HTTPException(status_code=400, detail="Empty PDF detected.")

        # 2. Send to AI Engine
      #this is the function from the ai_engine file 
        response = process_document(text, mode)
        
        # FastAPI will automatically convert the Pydantic model to JSON
        #response is returnned in the structured json form 
        print(response)

        return response
  

    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))