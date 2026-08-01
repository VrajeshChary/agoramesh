from uuid import UUID
from pydantic import BaseModel

class AgentPriceResponse(BaseModel):
    agent_id: UUID | str
    price: float
    currency: str
