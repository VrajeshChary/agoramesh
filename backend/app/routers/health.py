from fastapi import APIRouter
from app.core.config import get_settings

router = APIRouter()
settings = get_settings()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.get("/version")
async def get_version():
    return {"version": settings.version}
