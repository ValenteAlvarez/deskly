from contextlib import asynccontextmanager

from beanie import init_beanie
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import AsyncMongoClient

from app.config import settings
from app.models.ticket import Ticket
from app.routers import comments, status, tickets



@asynccontextmanager
async def lifespan(app: FastAPI):
	client = AsyncMongoClient(settings.mongo_uri)
	await init_beanie(database=client.get_default_database(), document_models=[Ticket])
	yield

app = FastAPI(title="Deskly Ticket API", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=[settings.frontend_url], allow_credentials=False, allow_headers=['*'], allow_methods=['*'])

app.include_router(tickets.router, prefix="/api/tickets", tags=["tickets"])
app.include_router(comments.router, prefix="/api/tickets/{ticket_id}/comentarios", tags=["comments"])
app.include_router(status.router, prefix="/api/tickets/{ticket_id}/transicion", tags=["status"])