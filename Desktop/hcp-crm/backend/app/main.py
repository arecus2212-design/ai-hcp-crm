from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware


# --- AI ---
from app.ai.interaction_agent import interaction_graph

# --- DB ---
from app.db import engine, SessionLocal
from app.models import Base, HCPInteraction

# -------------------------------
# App Init
# -------------------------------
app = FastAPI(title="AI-first HCP CRM")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # allows OPTIONS, POST, GET, etc.
    allow_headers=["*"],
)


# Create DB tables on startup
Base.metadata.create_all(bind=engine)

# -------------------------------
# Schemas
# -------------------------------
class AIRequest(BaseModel):
    text: str


class InteractionCreate(BaseModel):
    hcpName: str
    interactionType: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    attendees: Optional[str] = None
    topics: Optional[str] = None
    sentiment: Optional[str] = None


# -------------------------------
# AI Endpoint
# -------------------------------
@app.post("/ai/parse-interaction")
def parse_interaction(req: AIRequest):
    """
    Takes free-text input and returns structured HCP interaction data
    """
    result = interaction_graph.invoke({"text": req.text})
    return result


# -------------------------------
# Save Interaction to DB
# -------------------------------
@app.post("/interactions")
def save_interaction(data: InteractionCreate):
    """
    Saves reviewed interaction data to MySQL
    """
    db = SessionLocal()
    try:
        interaction = HCPInteraction(
            hcp_name=data.hcpName,
            interaction_type=data.interactionType,
            interaction_date=data.date,
            interaction_time=data.time,
            attendees=data.attendees,
            topics=data.topics,
            sentiment=data.sentiment,
        )
        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return {
            "status": "saved",
            "id": interaction.id
        }
    finally:
        db.close()


# -------------------------------
# Health Check
# -------------------------------
@app.get("/")
def health():
    return {"status": "AI-first HCP CRM backend running"}

