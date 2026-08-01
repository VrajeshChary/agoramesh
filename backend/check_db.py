import asyncio
from sqlalchemy import text
from app.core.database import AsyncSessionLocal

async def main():
    async with AsyncSessionLocal() as session:
        result = await session.execute(text("SELECT count(*) FROM executions"))
        count = result.scalar()
        print(f"Number of executions: {count}")
        
        result2 = await session.execute(text("SELECT id, agent_id FROM executions LIMIT 5"))
        print("Executions:", result2.fetchall())

if __name__ == "__main__":
    asyncio.run(main())
