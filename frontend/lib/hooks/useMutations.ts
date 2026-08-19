import { useMutation } from "@tanstack/react-query";
import { CommentCreate, StatusChange, TicketCreate } from "../types";

export function useTicketCreateMutation() {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	if (!API_URL) {
		throw new Error('API_URL value missing in .env');
	}

	return useMutation({
		mutationFn: (ticketData: TicketCreate) => {
			console.log('Sending:', ticketData);
			console.log('as json string:', JSON.stringify(ticketData));
			return fetch(`${API_URL}/tickets`, {headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(ticketData) })
		},
		onError: (error) => {
			console.error('An error has ocurred', error.message);
		},
		onSuccess: (data, ) => {
			console.log('Mutation success');
			console.log('Response status:', data.status);
		},
		onSettled: () => {
			console.log('Mutation settled');
		}
	})
}

export function useCommentAddMutation(ticketId: string) {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	if (!API_URL) {
		throw new Error('API_URL value missing in .env');
	}

	return useMutation({
		mutationFn: (data: CommentCreate) => {
			console.log('Sending:', data);
			return fetch(`${API_URL}/tickets/${ticketId}/comentarios`, {headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(data) })
		},
		onError: (error) => {
			console.error('An error has ocurred', error.message);
		},
		onSuccess: (data, ) => {
			console.log('Comment mtation success');
			console.log('Response status:', data.status);
		},
		onSettled: () => {
			console.log('Mutation settled');
		}
	})
}

export function useStatusTransitionMutation(ticketId: string) {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	if (!API_URL) {
		throw new Error('API_URL value missing in .env');
	}

	return useMutation({
		mutationFn: (data: StatusChange) => {
			console.log('Sending:', data);
			return fetch(`${API_URL}/tickets/${ticketId}/transicion`, {headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(data) })
		},
		onError: (error) => {
			console.error('An error has ocurred', error.message);
		},
		onSuccess: (data, ) => {
			console.log('Comment mtation success');
			console.log('Response status:', data.status);
		},
		onSettled: () => {
			console.log('Mutation settled');
		}
	})
}