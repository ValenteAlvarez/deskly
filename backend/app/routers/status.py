from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.lib.check_for_ticket import check_for_ticket
from app.lib.state_machine import can_transition
from app.models.ticket import State, Ticket
from app.schemas.ticket import TicketRead

from app.lib.ws import manager

router = APIRouter()

class StatusChange(BaseModel):
	state: State

@router.post('/', response_model=TicketRead)
async def change_status(change_state: StatusChange, ticket: Ticket = Depends(check_for_ticket)):
	new_ticket = None
	if not can_transition(ticket.state, change_state.state):
		print('Attempted illegal transition')
		raise HTTPException(status_code=400, detail=f"Illegal state transition from '{ticket.state.value}' to '{change_state.state.value}'")
	
	ticket.state = change_state.state
	new_ticket = await ticket.save()

	await manager.broadcast({
		"tipo": "ticket.actualizado",
		"ticket": new_ticket.model_dump(mode="json")
	})

	return TicketRead(
		id = str(new_ticket.id),
		title = new_ticket.title,
		description = new_ticket.description,
		priority = new_ticket.priority,
		state = new_ticket.state,
		assigned_to = new_ticket.assigned_to,
		created_at = new_ticket.created_at,
		updated_at = new_ticket.updated_at,
		comments = new_ticket.comments
	)