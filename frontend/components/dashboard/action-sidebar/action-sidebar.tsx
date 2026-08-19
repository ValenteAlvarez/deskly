'use client'
import './action-sidebar.scss'
import { TextButton } from "@/components/ui/button/buttons";
import Separator from "@/components/ui/separator/separator";
import { VStack } from "@/components/ui/stacks/stacks";
import FilterSelector from '../filter-selector/filter-selector';
import Modal from '@/components/ui/modal/modal';
import { useState } from 'react';
import CreateTicketForm from '../create-ticket-form/create-ticket-form';

export default function ActionSidebar() {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	return (
	<VStack className="action-sidebar" gap={10} mainAlign="start">
		<TextButton 
			handleClick={() => setIsCreateModalOpen(true)} 
			textColor={"var(--v-blue)"}
			className="action-sidebar-create-button"
		>
			Create Ticket
		</TextButton>

		<Separator width={"100%"} color="white"/>

		<FilterSelector />		
		{isCreateModalOpen && <Modal handleClose={() => setIsCreateModalOpen(false)}>
			<CreateTicketForm />
		</Modal>}
	</VStack>)
}