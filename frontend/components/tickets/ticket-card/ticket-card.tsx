import { Card } from "@/components/ui/card/card";
import { HStack, VStack } from "@/components/ui/stacks/stacks";
import StateLabel from "@/components/ui/state-label/state-label";
import { TicketRead } from "@/lib/types";
import './ticket-card.scss';

type TicketCardProps = {
	ticket: TicketRead
}

export default function TicketCard({ ticket }: TicketCardProps) {
	const priorityColor = (() => {
		switch(ticket.priority) {
			case 'low':
				return '#3251b5';
			case 'medium':
				return '#d2d23d';
			case 'high':
				return '#de3232';
			case 'critical':
				return '#bb3ad2';
		}
	})()

	const descriptionMaxLength = 150;
	
	return (
		<Card className="ticket-card" borderColor={'#dadada9c'} borderWidth={1}>
			<VStack horizontalAlign="stretch" mainAlign="center" gap={24}>
				<HStack mainAlign="space-between">
					<h1 className="ticket-card-title">{ticket.title}</h1>
					<StateLabel state={ticket.state}/>
				</HStack>
				<p className="ticket-card-description">{ticket.description.length <= descriptionMaxLength ? ticket.description : ticket.description.substring(0, descriptionMaxLength)}...</p>
				<p style={{color: priorityColor}}>Priority: {ticket.priority}</p>
				<p className="ticket-card-assigned-to">{ticket.assigned_to ? `Assigned: ${ticket.assigned_to}` : 'Unassigned'}</p>
			</VStack>
		</Card>
	)
}