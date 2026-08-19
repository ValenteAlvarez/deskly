import { useQuery } from "@tanstack/react-query";
import { PaginatedTickets, TicketPriority, TicketRead } from "../types";

export function useDashboardQuery(page: number = 1, take?: number, priority?: TicketPriority) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!apiUrl) throw new Error('API URL missing from .env');

	if (page <= 0) page = 1;

	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (take) params.append('take', take.toString());
	if (priority) params.append('priority', priority);

	return useQuery<PaginatedTickets>({
		queryKey: ['dashboard', 'tickets', { page, priority }],
		queryFn: async () => {
			const response = await fetch(`${apiUrl}/tickets?${params.toString()}`);
			if (!response.ok) {
				throw Error(`Error fetching tickets`)

			}

			return await response.json();
		}
	});
}

export function useTicketDetailsQuery(ticket: TicketRead) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	console.log('apiUrl', apiUrl);
	if (!apiUrl) throw new Error('API URL missing from .env');

	return useQuery<TicketRead>({
		queryKey: ['tickets', ticket.id],
		queryFn: async () => {
			const response = await fetch(`${apiUrl}/tickets/${ticket.id}`);
			if (!response.ok) {
				throw Error(`Error fetching ticket with ID: ${ticket.id}`)
			}

			return await response.json();
		},
		initialData: ticket
	});
}