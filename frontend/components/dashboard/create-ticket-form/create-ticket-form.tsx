import SimpleForm from "@/components/ui/simple-form/simple-form";
import { useTicketCreateMutation } from "@/lib/hooks/useMutations";
import { TicketCreate, TicketPriority } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type CreateTicketFormProps = {
	handleClose: () => void
}
export default function CreateTicketForm({handleClose}: CreateTicketFormProps) {
	const [newTicketData, setNewTicketData] = useState<TicketCreate>({
		title: '',
		description: '',
		assigned_to: '',
		priority: 'low'
	});
	const [submitError, setSubmitError] = useState(false);
	const queryClient = useQueryClient();

	const createTicket = useTicketCreateMutation();

	function isFormValid() {
		if (newTicketData.title === '' || newTicketData.description === '') {
			return false;
		}
		return true;
	}

	async function handleSubmit() {
		if (!isFormValid()) {
			setSubmitError(true);
			setTimeout(() => setSubmitError(false), 4000);
		}

		const response = await createTicket.mutateAsync(newTicketData);
		if (response.ok) {
			queryClient.invalidateQueries({queryKey: ['dashboard']});
			handleClose();
		}
		else alert('There was an issue adding the new ticket');
	}
	return (
	<SimpleForm<TicketCreate> 
		state={newTicketData} 
		setState={setNewTicketData} 
		handleSubmit={handleSubmit}
	>
		<SimpleForm.Title>Add new ticket</SimpleForm.Title>
		<SimpleForm.Group>
			<SimpleForm.TextInput id='title' placeholder="Title"/>
			<SimpleForm.TextInput id='description' placeholder="Description"/>
			<SimpleForm.TextInput id='assigned_to' placeholder="Assigned to (optional)"/>
			{/* <SimpleForm.TextInput id='priority' placeholder="Priority"/> */}
		</SimpleForm.Group>
		<label>
			<h2>Priority</h2>
			<select 
				value={newTicketData.priority} 
				onChange={(e) => setNewTicketData((curr) => ({
					...curr,
					priority: e.target.value as TicketPriority
				}))}
			>
				
				<option value="low">Low</option>
				<option value="medium">Medium</option>
				<option value="high">High</option>
				<option value="critical">Critical</option>
			</select>
		</label>

		<SimpleForm.Button action={handleSubmit}>Submit</SimpleForm.Button>
		{submitError && <p>Please fill in all required fields</p>}
	</SimpleForm>)
}