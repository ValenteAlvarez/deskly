'use client'
import './action-sidebar.scss'
import { TextButton } from "@/components/ui/button/buttons";
import Separator from "@/components/ui/separator/separator";
import { VStack } from "@/components/ui/stacks/stacks";
import FilterSelector from '../filter-selector/filter-selector';

export default function ActionSidebar() {

	return (
	<VStack className="action-sidebar" gap={10} mainAlign="start">
		<TextButton 
			handleClick={() => {

			}} 
			textColor={"var(--v-blue)"}
			className="action-sidebar-create-button"
		>
			Create Ticket
		</TextButton>

		<Separator width={"100%"} color="white"/>

		<FilterSelector />		
	</VStack>)
}