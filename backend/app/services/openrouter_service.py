import time
import httpx
from fastapi import HTTPException, status
from app.core.config import get_settings
from app.models.agent import Agent
from app.schemas.execute import ExecuteResponse

settings = get_settings()

async def execute_agent_prompt(agent: Agent, prompt: str) -> ExecuteResponse:
    api_key = settings.OPENROUTER_API_KEY
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Missing API key"
        )
    
    model = settings.DEFAULT_MODEL
    
    messages = [
        {"role": "system", "content": f"You are an AI agent named {agent.name}. {agent.description}"},
        {"role": "user", "content": prompt}
    ]

    start_time = time.time()
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "HTTP-Referer": "http://localhost:8000",
                    "X-Title": "AgoraMesh API",
                },
                json={
                    "model": model,
                    "messages": messages
                },
                timeout=60.0
            )
            response.raise_for_status()
            data = response.json()
            
            choices = data.get("choices", [])
            ai_response = choices[0].get("message", {}).get("content", "No response") if choices else "No response"
            
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="Timeout"
        )
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OpenRouter unavailable: {e.response.status_code} - {e.response.text}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OpenRouter unavailable: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"OpenRouter unavailable: {str(e)}"
        )
    
    execution_time_ms = int((time.time() - start_time) * 1000)
    
    return ExecuteResponse(
        agent_id=str(agent.id),
        agent_name=agent.name,
        model=model,
        prompt=prompt,
        response=ai_response,
        execution_time_ms=execution_time_ms
    )
