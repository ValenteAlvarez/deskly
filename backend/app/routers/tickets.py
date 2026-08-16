from fastapi import APIRouter

from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketRead

router = APIRouter()
@router.post('/', response_model=TicketRead)
async def create_ticket(payload: TicketCreate):
	new_ticket = Ticket(
		title=payload.title, 
		description=payload.description, 
		priority=payload.priority,
		assigned_to=payload.assigned_to
	)

	await new_ticket.save()
	return TicketRead(
        id=str(new_ticket.id),
        title=new_ticket.title,
        description=new_ticket.description,
        priority=new_ticket.priority,
        state=new_ticket.state,
        assigned_to=new_ticket.assigned_to,
        created_at=new_ticket.created_at,
        updated_at=new_ticket.updated_at,
        comments=new_ticket.comments,
    )
