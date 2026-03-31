from typing import List
from enum import Enum
from pydantic import BaseModel, Field

# --- LEGAL SCHEMAS ---
class RiskLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class LegalExtraction(BaseModel):
    parties: List[str] = Field(description="List of legal entities mentioned.")
    deadlines: List[str] = Field(description="Dates or deadlines in YYYY-MM-DD format.")
    financial_obligations: float = Field(description="Total money involved. 0.0 if none.")
    risk_assessment: RiskLevel = Field(description="The risk level based on penalty clauses.")
    summary: str = Field(description="2-sentence summary of the document.")

# --- MOM TEST SCHEMAS ---
class MomTestExtraction(BaseModel):
    problem_clarity: str = Field(description="How clearly is the customer's pain point defined? (Weak, Strong, Vague)")
    market_score: int = Field(description="Score from 1-10 on market potential.")
    mom_test_critique: str = Field(description="Brutally honest critique based on 'The Mom Test' book.")
    first_three_steps: List[str] = Field(description="The first 3 steps the founder should take to validate this.")

# --- SUMMARY SCHEMAS ---
class DocumentSummary(BaseModel):
    summary: str = Field(description="A concise, 1-sentence TL;DR of the document.")
    key_points: List[str] = Field(description="Exactly 3 critical bullet points from the text.")