from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(title="Advocacy OS Engine", version="2.0")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API routes. This keeps our main.py clean and focused on configuration, while 
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    # Important: Since main.py is inside the 'app' folder, we run it slightly differently
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)