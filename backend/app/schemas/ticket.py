from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.ticket import Priority, State

class TicketCreate(BaseModel):
	title: str
	description: str
	priority: Priority
	assigned_to: str | None = None

class TicketUpdate(BaseModel):
	model_config = ConfigDict(extra='forbid')
	
	title: str | None = None
	description: str | None = None
	priority: Priority | None = None
	assigned_to: str | None = None

class TicketRead(BaseModel):
	id: str
	title: str
	description: str
	priority: Priority
	state: State
	assigned_to: str | None
	created_at: datetime
	updated_at: datetime
	comments: list[str]