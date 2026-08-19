'use client'

import { TextButton } from "@/components/ui/button/buttons"
import { useStatusTransitionMutation } from "@/lib/hooks/useMutations"
import { StatusChange, TicketState } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ChangeState = {
	ticketId: string,
	currentStatus: TicketState
}
export function ChangeStatus({ ticketId, currentStatus }: ChangeState) {
	const [ticketStatus, setTicketState] = useState<StatusChange>({
		state: 'open'
	});
	const [submitError, setSubmitError] = useState('');

	const router = useRouter()

	const changeStatus = useStatusTransitionMutation(ticketId);

	async function handleSubmit() {
		const response = await changeStatus.mutateAsync(ticketStatus);
		const data = await response.json()
		if (!response.ok) {
			setSubmitError(data.detail);
			setTimeout(() => setSubmitError(''), 3000);
			setTicketState({state: currentStatus})
		}

		router.refresh();
	}
	return (
		<>
		<select value={ticketStatus.state} name="Set state" onChange={(e) => setTicketState({state: e.target.value as TicketState})}>
			<option value="open">Open</option>
			<option value="in_progress">In progress</option>
			<option value="resolved">Resolved</option>
			<option value="closed">Closed</option>
			<option value="reopened">Re-opened</option>
		</select>
		<TextButton handleClick={() => handleSubmit()} textColor={"black"} backgroundColor="var(--v-blue)">Save</TextButton>
		{submitError !== '' && <p>{submitError}</p>}
		</>

	)
}