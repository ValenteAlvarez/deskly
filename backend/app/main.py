from contextlib import asynccontextmanager

from beanie import init_beanie
from fastapi import FastAPI
from pymongo import AsyncMongoClient

from app.config import settings
from app.models.ticket import Ticket
from app.routers import tickets


@asynccontextmanager
async def lifespan(app: FastAPI):
	client = AsyncMongoClient(settings.mongo_uri)
	await init_beanie(database=client.get_default_database(), document_models=[Ticket])
	yield

app = FastAPI(title="Deskly Ticket API", lifespan=lifespan)
app.include_router(tickets.router, prefix="/api/tickets", tags=["tickets"])