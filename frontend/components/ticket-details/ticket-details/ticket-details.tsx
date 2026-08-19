'use client'

import TicketCard from "@/components/tickets/ticket-card/ticket-card"
import { BackButton } from "../back-button/back-button"
import { CommentString } from "@/components/comments/comment-string/comment-string"
import { AddCommentForm } from "@/components/comments/add-comment-form/add-comment-form"
import { ChangeStatus } from "../status-selection/status-selection"
import { TicketRead } from "@/lib/types"
import { useTicketDetailsQuery } from "@/lib/hooks/useQueries"
import { useTicketStream } from "@/lib/hooks/useTicketStream"

type TicketDetailsProps = {
	initialTicket: TicketRead
}
export function TicketDetails({initialTicket}: TicketDetailsProps) {
	const { data: ticket } = useTicketDetailsQuery(initialTicket);
	const connectionStatus = useTicketStream();
	
	return (
	<>
	<BackButton/>
	<TicketCard ticket={ticket}/>
	<CommentString comments={ticket.comments}/>
	<div style={{maxWidth: '300px'}}>
		<AddCommentForm ticketId={ticket.id}/>
	</div>
	<ChangeStatus ticketId={ticket.id} currentStatus={ticket.state}/>
	</>)
}