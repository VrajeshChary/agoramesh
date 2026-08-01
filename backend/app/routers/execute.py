from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.agent import Agent as AgentModel
from app.models.execution import Execution
from app.schemas.execute import ExecuteRequest, ExecuteResponse
from app.schemas.execution import ExecutionResponse
from app.services.openrouter_service import execute_agent_prompt
from app.middleware.payment import check_payment
from app.services.pricing_service import get_agent_price
from app.core.config import get_settings
from fastapi.responses import JSONResponse
from typing import List

settings = get_settings()

router = APIRouter(
    prefix="/agents",
    tags=["execute"],
    responses={404: {"description": "Not found"}},
)

@router.post("/{agent_id}/execute", response_model=ExecuteResponse, summary="Execute an AI agent")
async def execute_agent(
    agent_id: UUID,
    request: ExecuteRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Execute an AI request using the specified published agent via OpenRouter.
    
    - **agent_id**: The UUID of the published agent.
    - **prompt**: The prompt to send to the agent.
    """
    result = await db.execute(select(AgentModel).where(AgentModel.id == agent_id))
    agent = result.scalars().first()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    payment_status = await check_payment()
    if not payment_status.get("payment_verified"):
        pricing_info = await get_agent_price(agent_id, db)
        return JSONResponse(
            status_code=402,
            content={
                "message": "Payment Required",
                "agent_id": str(agent_id),
                "price": pricing_info["price"],
                "currency": pricing_info["currency"],
                "receiver": settings.AVM_ADDRESS
            }
        )
        
    response = await execute_agent_prompt(agent, request.prompt)
    
    execution_record = Execution(
        agent_id=agent.id,
        prompt=request.prompt,
        response=response.response,
        execution_time_ms=response.execution_time_ms,
        model=response.model
    )
    db.add(execution_record)
    await db.commit()
    await db.refresh(execution_record)
    
    return response

@router.get("/{agent_id}/executions", response_model=List[ExecutionResponse], summary="Get execution history for an agent")
async def get_agent_executions(
    agent_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Returns the execution history for one specific agent.
    """
    result = await db.execute(
        select(Execution)
        .where(Execution.agent_id == agent_id)
        .order_by(Execution.created_at.desc())
    )
    return result.scalars().all()
