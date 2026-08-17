

from fastapi import APIRouter, HTTPException

from app.models.ticket import Priority, Ticket
from app.schemas.ticket import TicketCreate, TicketRead, TicketUpdate

router = APIRouter(prefix='/api')

@router.post('/tickets', response_model=TicketRead)
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

@router.get('/tickets', response_model=list[TicketRead])
async def get_tickets(page: int = 0, priority: Priority | None = None ) -> list[TicketRead]:
	limit = 5 # Para mostrar pagination mas facil
	tickets = []
	filter = {}
	if priority is not None:
		filter = Ticket.priority == priority
	
	async for ticket in Ticket.find(filter).skip(page * limit).limit(limit):
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
	print(tickets)
	return tickets

@router.get('/tickets/{ticket_id}', response_model=TicketRead)
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

@router.patch('/tickets/{ticket_id}', response_model=TicketRead)
async def patch_ticket(ticket_id, update: TicketUpdate):
	ticket = await Ticket.get(ticket_id)
	if (ticket is None):
		raise HTTPException(status_code=404, detail='Ticket not found')
	
	sanitized_update = update.model_dump(exclude_unset=True)
	print(sanitized_update)

	updated_ticket = await ticket.update({"$set": sanitized_update})

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