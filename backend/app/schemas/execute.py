from pydantic import BaseModel
from uuid import UUID

class ExecuteRequest(BaseModel):
    prompt: str

class ExecuteResponse(BaseModel):
    agent_id: UUID | str
    agent_name: str
    model: str
    prompt: str
    response: str
    execution_time_ms: int
