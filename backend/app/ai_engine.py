from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from app.config import settings
from app.schemas import LegalExtraction, MomTestExtraction, DocumentSummary

# Initialize the LLM securely
llm = ChatGoogleGenerativeAI(
    model=settings.MODEL_NAME, 
    temperature=0, 
    api_key=settings.GOOGLE_API_KEY
)

def process_document(text: str, mode: str):
    """
    The Dispatcher: Routes the text to the correct LangChain Expert.
    """
    if mode == "legal":
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a senior Indian corporate lawyer. Extract accurate contract data."),
            ("human", "{document_text}")
        ])
        chain = prompt | llm.with_structured_output(LegalExtraction)
        
    elif mode == "mom_test":
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a Y-Combinator partner. Analyze this business document or idea based on 'The Mom Test' principles. Be highly critical of vanity metrics."),
            ("human", "{document_text}")
        ])
        chain = prompt | llm.with_structured_output(MomTestExtraction)
        
    elif mode == "summary":
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an executive assistant. Summarize this document rapidly and accurately."),
            ("human", "{document_text}")
        ])
        chain = prompt | llm.with_structured_output(DocumentSummary)
        
    else:
        raise ValueError(f"Unknown processing mode: {mode}")

    # Run the selected chain
    return chain.invoke({"document_text": text})