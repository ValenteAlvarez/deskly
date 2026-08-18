'use client'
import { LinkButton, TextButton } from "@/components/ui/button/buttons";
import Separator from "@/components/ui/separator/separator";
import { VStack } from "@/components/ui/stacks/stacks";
import './action-sidebar.scss'

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

		<VStack horizontalAlign="stretch" gap={12} className="action-sidebar-filter-options">
			<h1 className="action-sidebar-filter-title">Priority Filter</h1>
			<LinkButton url={'/'}>
				<span className="action-sidebar-filter-option">Low</span>
			</LinkButton>
			<LinkButton url={'/'}>
				<span className="action-sidebar-filter-option">Medium</span>
			</LinkButton>
			<LinkButton url={'/'}>
				<span className="action-sidebar-filter-option">High</span>
			</LinkButton>
			<LinkButton url={'/'}>
				<span className="action-sidebar-filter-option active">Critical</span>
			</LinkButton>
		</VStack>
		
	</VStack>)
}