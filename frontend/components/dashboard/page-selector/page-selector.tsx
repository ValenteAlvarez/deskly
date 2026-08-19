import { TextButton } from "@/components/ui/button/buttons";
import { HStack } from "@/components/ui/stacks/stacks";
import './page-selector.scss'

type PageSelectorProps = {
	currentPage: number,
	totalPages: number,
	handlePageChange: (pageNumber: number) => void
}
export default function PageSelector({currentPage, totalPages, handlePageChange}: PageSelectorProps) {

	return (
	<HStack verticalAlign="center" gap={8} className="page-selector-wrapper">
		{currentPage > 1 && 
		<TextButton backgroundColor={'var(--v-blue)'} textColor={'white'} handleClick={() => {handlePageChange(currentPage - 1)}}>
			{'<'}
		</TextButton>}

		<span className="page-selector-indicator">
			{`${currentPage} of ${totalPages}`}
		</span>

		{currentPage < totalPages && 
		<TextButton backgroundColor={'var(--v-blue)'} textColor={'white'} handleClick={() => {handlePageChange(currentPage + 1)}}>
			{'>'}
		</TextButton>}
	</HStack>	
	)
}