import { AddCommentForm } from "@/components/comments/add-comment-form/add-comment-form";
import { CommentString } from "@/components/comments/comment-string/comment-string";
import { BackButton } from "@/components/ticket-details/back-button/back-button";
import { ChangeStatus } from "@/components/ticket-details/status-selection/status-selection";
import TicketCard from "@/components/tickets/ticket-card/ticket-card";
import { TicketRead } from "@/lib/types";

type TicketDetailsProps = {
	params: Promise<{ticketId: string}>
}
export default async function TicketDetails({ params }: TicketDetailsProps) {
	const { ticketId } = await params;
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const ticket: TicketRead = await (await fetch(`${API_URL}/tickets/${ticketId}`)).json();
	console.log('Hello from the server!');
	return (
		<>
		<BackButton/>
		<TicketCard ticket={ticket}/>
		<CommentString comments={ticket.comments}/>
		<div style={{maxWidth: '300px'}}>
			<AddCommentForm ticketId={ticketId}/>
		</div>
		<ChangeStatus ticketId={ticketId} currentStatus={ticket.state}/>
		</>
	)
}