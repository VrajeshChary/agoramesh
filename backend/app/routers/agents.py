from typing import List
from uuid import UUID
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.schemas.agent import Agent, AgentCreate
from app.schemas.pricing import AgentPriceResponse
from app.models.agent import Agent as AgentModel
from app.core.database import get_db
from app.services.pricing_service import get_agent_price

router = APIRouter(
    prefix="/agents",
    tags=["agents"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=Agent, status_code=status.HTTP_201_CREATED, summary="Create a new agent")
async def create_agent(agent_in: AgentCreate, db: AsyncSession = Depends(get_db)):
    """
    Create a new agent with the following information:
    - **name**: Name of the agent
    - **description**: Description of the agent
    - **category**: Category of the agent
    - **price**: Price for using the agent
    - **endpoint_url**: URL where the agent is hosted
    """
    new_agent = AgentModel(**agent_in.model_dump())
    db.add(new_agent)
    await db.commit()
    await db.refresh(new_agent)
    return new_agent

@router.get("/", response_model=List[Agent], summary="List all agents")
async def get_agents(db: AsyncSession = Depends(get_db)):
    """
    Retrieve all available agents.
    """
    result = await db.execute(select(AgentModel))
    return result.scalars().all()

@router.get("/{agent_id}", response_model=Agent, summary="Get a specific agent")
async def get_agent(agent_id: UUID, db: AsyncSession = Depends(get_db)):
    """
    Retrieve a specific agent by its ID.
    """
    result = await db.execute(select(AgentModel).where(AgentModel.id == agent_id))
    agent = result.scalars().first()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    return agent

@router.get("/{agent_id}/price", response_model=AgentPriceResponse, summary="Get the pricing for an agent")
async def get_price(agent_id: UUID, db: AsyncSession = Depends(get_db)):
    """
    Retrieve the price and currency required to use this agent.
    """
    return await get_agent_price(agent_id, db)

@router.delete("/{agent_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete an agent")
async def delete_agent(agent_id: UUID, db: AsyncSession = Depends(get_db)):
    """
    Delete a specific agent by its ID.
    """
    result = await db.execute(select(AgentModel).where(AgentModel.id == agent_id))
    agent = result.scalars().first()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
        
    await db.delete(agent)
    await db.commit()
    return None
