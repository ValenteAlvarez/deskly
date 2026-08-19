

from math import ceil

from fastapi import APIRouter, HTTPException

from app.models.ticket import Priority, Ticket
from app.schemas.ticket import PaginatedTickets, TicketCreate, TicketRead, TicketUpdate

from app.lib.ws import manager

router = APIRouter()

@router.post('/', response_model=TicketRead)
async def create_ticket(payload: TicketCreate):
	print('Received:', payload)
	new_ticket = Ticket(
		title=payload.title, 
		description=payload.description, 
		priority=payload.priority,
		assigned_to=payload.assigned_to
	)

	await manager.broadcast({
		"tipo": "ticket.creado",
		"ticket": new_ticket.model_dump(mode="json")
	})

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

@router.get('/', response_model=PaginatedTickets)
async def get_tickets(page: int = 1, take: int = 5, priority: Priority | None = None ) -> PaginatedTickets:
	tickets = []
	filter = {}
	if priority is not None:
		filter = Ticket.priority == priority

	count = await Ticket.find(filter).count()
	total_pages = ceil(count / take)

	if page > total_pages:
		page = total_pages
	
	computed_skip = (page - 1) * take

	async for ticket in Ticket.find(filter).skip(computed_skip).limit(take):
		tickets.append(TicketRead(
			id=str(ticket.id),
			title=ticket.title,
			description=ticket.description,
			priority=ticket.priority,
			state=ticket.state,
			assigned_to=ticket.assigned_to,
			comments=ticket.comments,
			created_at=ticket.created_at,
			updated_at=ticket.updated_at
		))
	return PaginatedTickets(tickets=tickets, ticket_count=count, total_pages=total_pages)

@router.get('/{ticket_id}', response_model=TicketRead)
async def get_ticket(ticket_id):
	ticket = await Ticket.get(ticket_id)
	if (ticket is None):
		raise HTTPException(status_code=404, detail="Ticket not found")

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

@router.patch('/{ticket_id}', response_model=TicketRead)
async def patch_ticket(ticket_id, update: TicketUpdate):
	ticket = await Ticket.get(ticket_id)
	if (ticket is None):
		raise HTTPException(status_code=404, detail='Ticket not found')
	
	sanitized_update = update.model_dump(exclude_unset=True)

	updated_ticket = await ticket.update({"$set": sanitized_update})

	await manager.broadcast({
		"tipo": "ticket.actualizado",
		"ticket": updated_ticket.model_dump(mode="json")
	})

	return TicketRead(
		id=str(updated_ticket.id),
		title=updated_ticket.title,
		description=updated_ticket.description,
		priority=updated_ticket.priority,
		state=updated_ticket.state,
		assigned_to=updated_ticket.assigned_to,
		created_at=updated_ticket.created_at,
		updated_at=updated_ticket.updated_at,
		comments=updated_ticket.comments,
	)