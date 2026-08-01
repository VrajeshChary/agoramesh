from datetime import datetime, timezone
from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from typing import Optional

class AgentBase(BaseModel):
    name: str = Field(..., description="The name of the agent")
    description: str = Field(..., description="A brief description of what the agent does")
    category: str = Field(..., description="The category the agent belongs to")
    price: float = Field(0.0, ge=0.0, description="The price to use the agent")
    endpoint_url: str = Field(..., description="The URL where the agent can be reached")

class AgentCreate(AgentBase):
    pass

class Agent(AgentBase):
    id: UUID = Field(default_factory=uuid4, description="The unique identifier for the agent")
    trust_score: int = Field(100, description="The trust score of the agent, default is 100")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc), description="The time when the agent was created")

    class Config:
        from_attributes = True
