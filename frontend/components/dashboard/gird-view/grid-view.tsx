'use client'
import TicketCard from '@/components/tickets/ticket-card/ticket-card';
import './grid-view.scss'
import { useDashboardQuery } from "@/lib/hooks/useQueries"
import { useSearchParams } from 'next/navigation';

export default function GridView() {
	const params = useSearchParams();
	const page = Number(params.get('page'));
	const take = Number(params.get('take'));
	const priorityFilter = params.get('priority');
	// cast to make the typescript shut up
	const priority = (['low', 'medium', 'high', 'critical'] as const).find(
		(value) => value === priorityFilter
	);

	const { data, isPending, isError } = useDashboardQuery(page, take, priority);
	if (isPending) {
		return <h1>Loading...</h1>
	}

	if (isError) {
		<h1>Error fetching tickets</h1>
	}

	return (
	<article className={'grid-view-wrapper'}>
		{data?.tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)}
	</article>)
}