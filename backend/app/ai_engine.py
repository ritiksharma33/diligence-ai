from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from app.config import settings
from app.schemas import LegalExtraction, MomTestExtraction, DocumentSummary
from app.schemas import NumerologyExtraction
# Initialize the LLM securely
#temp =0 means deterministic output. You can experiment with higher values for more creativity,
# chat model vs llm model 
llm = ChatGoogleGenerativeAI(
    model=settings.MODEL_NAME, 
    temperature=0, 
    api_key=settings.GOOGLE_API_KEY
)
# the text  is passed inside the argument of the invoke function 
def process_document(text: str, mode: str):
    """
    The Dispatcher: Routes the text to the correct LangChain Expert.
    """
    #This checks the "mode" variable. If the user clicked the Legal button in the UI, we enter this block to set up the Legal Specialist.
    if mode == "legal":
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a senior Indian corporate lawyer. Extract accurate contract data."),
            ("human", "{document_text}")
        ])
        #this forces for structtured output 
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
    elif mode == "numerology":
        prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a Master Numerologist specializing in the Godwin System. 
        Your goal is to calculate four core numbers and provide deep insights.

        
        1. **Life Path**: 
           - Reduce Day, Month, and Year to a single digit SEPARATELY first.
           - Exception: If a component is a Master Number (11, 22, 33), DO NOT reduce it.
           - Sum the three results, then reduce the total to a single digit (unless it's a Master Number).
           - Example: 21-02-2003 -> Day (2+1=3), Month (2), Year (2+0+0+3=5). Total: 3+2+5 = 10 -> 1.
           - Example: Nov 4 1975 -> Day (4), Month (11), Year (1+9+7+5=22). Total: 4 + 11 + 22 = 37 -> 10 -> 1.

        2. **Birthday Number**: 
           - Reduce the day of birth to a single digit.
           - Exception: Do not reduce if the day is 11 or 22.
           - Example: 21st becomes 3.

        3. **Expression Number**:
           - Use the Pythagorean Table: (1:AJ-S, 2:BK-T, 3:CL-U, 4:DM-V, 5:EN-W, 6:FOX, 7:GPY, 8:HQZ, 9:IR).
           - Sum the values of the FULL name. Do not reduce intermediate letters, only the final sum.
           - Preserve Master Numbers (11, 22, 33) in the final result.

        4. **Soul Urge**: 
           - Same as Expression, but sum ONLY the Vowels (A, E, I, O, U) of the name.

        ### OUTPUT REQUIREMENTS:
        - First, perform the math in a hidden 'thinking' step.
        - Provide 3-4 line descriptions for each number using Godwin's logic.
        - Answer the user's specific query (career/money/love) with crisp action steps."""),
        ("human", "{document_text}")
    ])
    
        chain = prompt | llm.with_structured_output(NumerologyExtraction)
        
    else:
        raise ValueError(f"Unknown processing mode: {mode}")

    # Run the selected chain
    #Up until this line, nothing has actually happened. You’ve just been building a "plan." This line pulls the trigger
    return chain.invoke({"document_text": text})