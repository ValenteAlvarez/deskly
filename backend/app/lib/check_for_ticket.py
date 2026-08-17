from fastapi import HTTPException

from app.models.ticket import Ticket


async def check_for_ticket(ticket_id: str) -> Ticket:
	ticket = await Ticket.get(ticket_id)
	if ticket is None:
		raise HTTPException(status_code=404, detail="Ticket not found")

	return ticket