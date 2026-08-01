from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class ExecutionResponse(BaseModel):
    id: UUID
    agent_id: UUID
    prompt: str
    response: str
    execution_time_ms: int
    model: str
    created_at: datetime

    class Config:
        from_attributes = True
