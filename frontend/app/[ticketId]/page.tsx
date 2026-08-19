import { TicketDetails } from "@/components/ticket-details/ticket-details/ticket-details";
import { TicketRead } from "@/lib/types";

type TicketDetailsProps = {
	params: Promise<{ticketId: string}>
}
export default async function TicketDetailsPage({ params }: TicketDetailsProps) {
	const { ticketId } = await params;
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const ticket: TicketRead = await (await fetch(`${API_URL}/tickets/${ticketId}`)).json();
	console.log('Hello from the server!');
	return (
		<TicketDetails initialTicket={ticket}/>
	)
}