from typing import List
from enum import Enum
from pydantic import BaseModel, Field

# --- LEGAL SCHEMAS ---
class RiskLevel(str, Enum):
    #Think of an Enum as a Multiple Choice Question.

#The Problem: If you just asked the AI for "Risk," it might say "Very dangerous," "Medium-ish," or "Not really risky."
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

# basemodel Blueprint. It defines the structure of the data we expect to receive from the AI
class LegalExtraction(BaseModel):
    #must be list of strings 
    #description="Exactly 3 critical bullet points", you are essentially "Prompt Engineering" inside your data structure.
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

from pydantic import BaseModel, Field
from typing import List

class NumerologyDetail(BaseModel):
    number: int = Field(..., description="The calculated numerology number.")
    description: str = Field(..., description="A 3-4 line deep dive into what this number means for the user.")

class NumerologyExtraction(BaseModel):
    # Part 1: The Core Four
    life_path: NumerologyDetail = Field(..., description="Calculated from full Date of Birth. use godwin numelogy book for reading logic")
    expression: NumerologyDetail = Field(..., description="Calculated from full Name (Talent/Goal).use godwin numelogy book for reading logic")
    birthday_number: NumerologyDetail = Field(..., description="The day of the month they were born.use godwin numelogy book for reading logic")
    soul_urge: NumerologyDetail = Field(..., description="The 'Heart's Desire' calculated from vowels in the name.use godwin numelogy book for reading logic")

    # Part 2: The Specific Query Answer
    query_insight: str = Field(..., description="A detailed answer to the user's specific query (career, love, etc.) based on their numbers.")
    
    # Part 3: Action Steps (The "Crisp" Summary)
    action_steps: List[str] = Field(
        ..., 
        description="4-5 concise, high-impact action steps for the user to take right now.",
        min_items=4,
        max_items=5
    )