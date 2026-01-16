from sqlalchemy import Column, Integer, String, Text, Date, Time, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class HCPInteraction(Base):
    __tablename__ = "hcp_interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String(255), nullable=False)
    interaction_type = Column(String(50))
    interaction_date = Column(Date)
    interaction_time = Column(Time)
    attendees = Column(Text)
    topics = Column(Text)
    sentiment = Column(String(20))
    created_at = Column(TIMESTAMP, server_default=func.now())
