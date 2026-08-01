# AgoraMesh Backend API

This is the backend for AgoraMesh, an AI Agent Marketplace built for the NexVerse Hackathon.

## Features

- **FastAPI**: High performance asynchronous framework.
- **Pydantic v2**: Data validation and settings management.
- **Modular Architecture**: Clean, scalable folder structure.
- **Middleware**: Includes Request ID and Global Error Handling.
- **Logging**: Configured out of the box.
- **CORS**: Configurable via environment variables.

## Project Structure

- `app/core/`: Configuration, logging, and core exceptions.
- `app/middleware/`: Custom FastAPI middleware.
- `app/routers/`: API route definitions.
- `app/schemas/`: Pydantic models for request/response payloads.
- `app/models/`: Database models (e.g., SQLAlchemy or Tortoise ORM).
- `app/services/`: Business logic layer.
- `app/repositories/`: Data access layer.
- `app/utils/`: Utility functions and helpers.
- `tests/`: Unit and integration tests.

## Local Development

Prerequisites:
- Python 3.13
- [uv](https://github.com/astral-sh/uv) (recommended)

1. **Install dependencies**:
   ```bash
   uv venv
   # On Windows: 
   .venv\Scripts\activate
   # On Unix:
   # source .venv/bin/activate
   
   uv pip install -e .
   ```

2. **Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. **Run the server**:
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at `http://127.0.0.1:8000`.
You can view the interactive documentation at `http://127.0.0.1:8000/docs`.
