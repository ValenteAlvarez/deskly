import { HStack } from "@/components/ui/stacks/stacks";

type PageSelectorProps = {
	currentPage: number,
	totalPages: number,
	handlePageChange: (pageNumber: number) => void
}
export default function PageSelector({currentPage, totalPages, handlePageChange}: PageSelectorProps) {

	return (
	<HStack verticalAlign="center">
		{currentPage > 1 && 
		<button onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1)}}>
			{'<'}
		</button>}

		<span className="page-selector-indicator">
			{`${currentPage} of ${totalPages}`}
		</span>

		{currentPage < totalPages && 
		<button onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1)}}>
			{'>'}
		</button>}
	</HStack>	
	)
}