'use client'
import TicketCard from '@/components/tickets/ticket-card/ticket-card';
import './grid-view.scss'
import { useDashboardQuery } from "@/lib/hooks/useQueries"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PageSelector from '../page-selector/page-selector';
import { addSearchParam } from '@/lib/editSearchParams';

export default function GridView({  }) {
	const router = useRouter();
	const path = usePathname();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get('page'));
	const take = Number(searchParams.get('take'));
	const priorityParam = searchParams.get('priority');
	const priority = priorityParam === null ? undefined : priorityParam as "low" | "medium" | "high" | "critical";

	const { data, isPending, isError } = useDashboardQuery(page, take, priority);
	
	if (isPending) {
		return <h1>Loading...</h1>
	}

	if (isError) {
		<h1>Error fetching tickets</h1>
	}

	if (!data) return;

	console.log('path', path);

	return (
	<div className='grid-view-wrapper'>
		<article className={'grid-view-cards-container'}>
			{data?.tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket}/>)}
		</article>
		{data!.total_pages > 1 &&
		<PageSelector 
			currentPage={page || 1} 
			totalPages={data.total_pages} 
			handlePageChange={(page) => {
				router.push(path + '?' + addSearchParam(searchParams, 'page', page.toString()))
			}} 
		/>}
	</div>)
}