from uuid import UUID
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.agent import Agent
from app.schemas.pricing import AgentPriceResponse

async def get_agent_price(agent_id: UUID, db: AsyncSession) -> dict:
    """
    Read the agent from the database and return its price.
    """
    result = await db.execute(select(Agent).where(Agent.id == agent_id))
    agent = result.scalars().first()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    return {
        "agent_id": str(agent.id),
        "price": agent.price,
        "currency": "USDC"
    }
