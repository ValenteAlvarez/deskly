import TicketCard from "@/components/tickets/ticket-card/ticket-card"
import { TicketRead } from "@/lib/types"
import './grid-view.scss'

type GridViewProps = {
	tickets: TicketRead[]
}
export default function GridView({ tickets }: GridViewProps) {
	return (
	<article className={'grid-view-wrapper'}>
		{tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)}
	</article>)
}