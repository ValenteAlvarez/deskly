'use client'

import SimpleForm from "@/components/ui/simple-form/simple-form"
import { useCommentAddMutation } from "@/lib/hooks/useMutations";
import { useRouter } from "next/navigation";
import { useState } from "react"

type AddCommentFormProps = {
	ticketId: string,
}
export function AddCommentForm({ticketId}: AddCommentFormProps) {
	const [addCommentState, setAddCommentState] = useState({
		comment: ''
	});

	const [submitErrors, setSubmitErrors] = useState('');
	const router = useRouter();

	const addComment = useCommentAddMutation(ticketId);

	async function handleSubmit() {
		if (addCommentState.comment === '') {
			setSubmitErrors('Comment cannot be empty');
			setTimeout(() => setSubmitErrors(''), 3000);
			return;
		}

		const response = await addComment.mutateAsync(addCommentState);
		if (!response.ok) {
			setSubmitErrors('There was a problem submitting the comment.');
			setTimeout(() => setSubmitErrors(''), 3000);
			return;
		}

		router.refresh();
		setAddCommentState({comment: ''});
	}
	return (
	<SimpleForm state={addCommentState} setState={setAddCommentState} handleSubmit={() => handleSubmit()}>
		<SimpleForm.Group>
			<SimpleForm.TextInput id={'comment'} placeholder="Add Comment"/>
			<SimpleForm.Button action={() => handleSubmit()}>Add comment</SimpleForm.Button>
		</SimpleForm.Group>
		{submitErrors !== '' && <p>{'Submit error'}</p>}
	</SimpleForm>
	)
}