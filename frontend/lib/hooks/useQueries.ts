import { useQuery } from "@tanstack/react-query";

export function useDashboardQuery() {
	return useQuery({
		queryKey: ['dashboard'],
		queryFn: () => {
			return fetch('')
		}
	})
}