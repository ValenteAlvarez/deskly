'use client'
import { Card } from "@/components/ui/card/card";
import { HStack, VStack } from "@/components/ui/stacks/stacks";
import StateLabel from "@/components/tickets/state-label/state-label";
import { TicketRead } from "@/lib/types";
import './ticket-card.scss';
import Banner from "@/components/ui/banner/banner";
import { useRouter } from "next/navigation";

type TicketCardProps = {
	ticket: TicketRead
}

export default function TicketCard({ ticket }: TicketCardProps) {
	const router = useRouter()
	const priorityTone: "high" | "critical" | "good" | "subdued" | "info" | "warning" = (() => {
		switch(ticket.priority) {
			case 'low':
				return 'good';
			case 'medium':
				return 'warning';
			case 'high':
				return 'high';
			case 'critical':
				return 'critical';
		}
	})()

	const descriptionMaxLength = 150;
	
	return (
		<div className="ticket-card-wrapper" onDoubleClick={() => router.push(`/${ticket.id}`)}>
		<Card className="ticket-card" borderColor={'#dadada9c'} borderWidth={1}>
			<VStack horizontalAlign="stretch" mainAlign="center" gap={24}>
				<HStack mainAlign="space-between">
					<h1 className="ticket-card-title">{ticket.title}</h1>
					<StateLabel state={ticket.state}/>
				</HStack>
				<p className="ticket-card-description">{ticket.description.length <= descriptionMaxLength ? ticket.description : ticket.description.substring(0, descriptionMaxLength)}...</p>
				<Banner tone={priorityTone}>
					<p>Priority: {ticket.priority}</p>
				</Banner>
				<p className="ticket-card-assigned-to">{ticket.assigned_to ? `Assigned: ${ticket.assigned_to}` : 'Unassigned'}</p>
			</VStack>
		</Card>
		</div>
	)
}