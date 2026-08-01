import httpx
import asyncio

async def main():
    async with httpx.AsyncClient(base_url="http://127.0.0.1:8000") as client:
        # Create agent
        res = await client.post("/agents/", json={
            "name": "Test Agent",
            "description": "Test",
            "category": "test",
            "price": 10,
            "endpoint_url": "http://localhost"
        })
        agent_id = res.json()["id"]
        print("Agent ID:", agent_id)
        
        # Execute
        res = await client.post(f"/agents/{agent_id}/execute", json={
            "prompt": "Say hello"
        })
        print("Execute Status:", res.status_code)
        print("Execute Response:", res.json())
        
        # Get Executions
        res = await client.get("/executions/")
        print("All executions:", res.json())

if __name__ == "__main__":
    asyncio.run(main())
