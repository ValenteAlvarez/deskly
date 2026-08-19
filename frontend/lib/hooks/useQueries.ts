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

	console.log('Generated params:', params.toString());

	return useQuery<PaginatedTickets>({
		queryKey: ['dashboard', 'tickets', { page, priority }],
		queryFn: async () => {
			const response = await fetch(`${apiUrl}/tickets?${params.toString()}`);
			if (!response.ok) {
				// Handle whatever
			}

			return await response.json();
		}
	});
}

export function useTicketDetailsQuery(ticketId: string) {
	const apiUrl = process.env.API_URL;
	if (!apiUrl) throw new Error('API URL missing from .env');

	return useQuery<TicketRead>({
		queryKey: ['dashboard', { ticketId }],
		queryFn: async () => {
			const response = await fetch(`${apiUrl}/tickets/${ticketId}`);
			if (!response.ok) {
				// Handle whatever
			}

			return await response.json();
		}
	});
}