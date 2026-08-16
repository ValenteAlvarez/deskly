from beanie import Document
from datetime import datetime, timezone
from enum import Enum

from pydantic import Field


# Enums
class Priority(str, Enum):
	LOW = 'low'
	MEDIUM = 'medium'
	HIGH = 'high'
	CRITICAL = 'critical'

class State(str, Enum):
	OPEN = 'open'
	IN_PROGRESS = 'in_progress'
	RESOLVED = 'resolved'
	CLOSED = 'closed'
	REOPENED = 'reopened'

# MongoDB Model
class Ticket(Document):
	title: str
	description: str
	priority: Priority
	state: State = State.OPEN
	assigned_to: str | None = None
	created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
	updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
	comments: list[str] = Field(default_factory=list)

	class Settings:
		name = 'Ticket'
		indexes = ['state', 'priority']
