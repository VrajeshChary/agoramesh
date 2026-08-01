import httpx
import asyncio

async def main():
    async with httpx.AsyncClient(base_url="http://127.0.0.1:8000") as client:
        res = await client.get("/executions/")
        executions = res.json()
        print("All executions:", executions)
        
        if executions:
            agent_id = executions[0]["agent_id"]
            res = await client.get(f"/agents/{agent_id}/executions")
            print(f"Agent {agent_id} executions:", res.json())

if __name__ == "__main__":
    asyncio.run(main())
