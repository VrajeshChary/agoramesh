"""
Application configuration settings.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings and configuration.
    """
    project_name: str = "AgoraMesh API"
    version: str = "0.1.0"
    api_v1_str: str = "/api/v1"

    # CORS
    cors_origins: list[str] = ["*"]

    # Database
    DATABASE_URL: str = (
        "postgresql+asyncpg://postgres:postgres@localhost:5432/agoramesh"
    )

    # OpenRouter
    OPENROUTER_API_KEY: str | None = None
    DEFAULT_MODEL: str = "nvidia/nemotron-3-ultra-550b-a55b:free"

    # Payment
    AVM_ADDRESS: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


@lru_cache
def get_settings() -> Settings:
    """
    Get the application settings. Cached using lru_cache.
    """
    return Settings()
