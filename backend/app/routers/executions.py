from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.execution import Execution
from app.schemas.execution import ExecutionResponse

router = APIRouter(
    prefix="/executions",
    tags=["executions"],
)

@router.get("/", response_model=List[ExecutionResponse], summary="Get all executions")
async def get_all_executions(db: AsyncSession = Depends(get_db)):
    """
    Returns a list of all successful executions across all agents.
    """
    result = await db.execute(
        select(Execution)
        .order_by(Execution.created_at.desc())
    )
    return result.scalars().all()
