
import hmac
import hashlib

from fastapi import APIRouter, HTTPException, Request

from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketRead
from app.config import settings

from app.lib.ws import manager

router = APIRouter()

@router.post("/api/webhooks/tickets", response_model=TicketRead)
async def webhook_create_ticket(request: Request):
	raw_body = await request.body()
	signature = request.headers.get("X-Signature", "")

	expected = hmac.new(
		settings.webhook_secret.encode(),
		raw_body,
		hashlib.sha256
	).hexdigest()

	if not hmac.compare_digest(expected, signature):
		raise HTTPException(status_code=401, detail="Invalid signature")

	try:
		payload = TicketCreate.model_validate_json(raw_body)
	except Exception:
		raise HTTPException(status_code=422, detail="Malformed payload")

	ticket = Ticket(**payload.model_dump())
	await ticket.insert()
	
	await manager.broadcast({	
		"tipo": "ticket.creado",
		"ticket": ticket.model_dump(mode="json")
	})

	return TicketRead(
        id=str(ticket.id),
        title=ticket.title,
        description=ticket.description,
        priority=ticket.priority,
        state=ticket.state,
        assigned_to=ticket.assigned_to,
        created_at=ticket.created_at,
        updated_at=ticket.updated_at,
        comments=ticket.comments,
    )