from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.lib.check_for_ticket import check_for_ticket
from app.models.ticket import Ticket


router = APIRouter()

class CommentCreate(BaseModel):
	comment: str

@router.post('/', response_model=list[str])
async def get_comments(new_comment: CommentCreate, ticket: Ticket = Depends(check_for_ticket)) -> list[str]:
	ticket.comments.append(new_comment.comment)
	updated_ticket = await ticket.save()
	return updated_ticket.comments
	