/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import Link from 'next/link';
import { Card } from '../card/card';
import './simple-form.scss'
type FormContextType = {
	state: Record<string, any>,
	setState: Dispatch<SetStateAction<Record<string, any>>>
}
const FormContext = createContext<FormContextType | null>(null);

function useFormContext() {
	const context = useContext(FormContext);
	if (!context) throw new Error('Context values were not provided!');

	return context;
}

type SimpleFormProps<T extends Record<string, any>> = {
	state: T,
	setState: Dispatch<SetStateAction<T>>,
	handleSubmit: () => void,
	children: ReactNode
}
export default function SimpleForm<T extends Record<string, any>>({
	state,
	setState,
	handleSubmit,
	children
}: SimpleFormProps<T>) {

	return (
		<FormContext.Provider value={{ state, setState: setState as Dispatch<SetStateAction<Record<string, any>>> }}>
			<Card>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						handleSubmit();
					}}
					className={'simple-form-wrapper'}
				>
					{children}
				</form>
			</Card>
		</FormContext.Provider>
	)
}

type TitleProps = {
	children: string
};

SimpleForm.Title = function Title({ children }: TitleProps) {
	return <h1 className='simple-form-title'>{children}</h1>
}

type InputGroupProps = {
	children: ReactNode
};

SimpleForm.Group = function InputGroup({ children }: InputGroupProps) {
	return <div className='simple-form-group'>{children}</div>
}

type TextInputProps = {
	placeholder: string,
	id: string,
};

SimpleForm.TextInput = function TextInput({ placeholder, id }: TextInputProps) {
	const { state, setState } = useFormContext();
	if (!Object.keys(state).includes(id)) throw Error(`property ${id} is not present in the state object`);

	return (
		<fieldset className={'simple-form-input'}>
			<input
				id={id}
				type="text"
				name={placeholder}
				placeholder={' '}
				onChange={(e) => setState({ ...state, [id]: e.target.value })}
				value={state[id]}
			/>
			<label htmlFor={id}>{placeholder}</label>

		</fieldset>
	)
}

SimpleForm.HiddenInput = function HiddenTextInput({ placeholder, id }: TextInputProps) {
	const { state, setState } = useFormContext();
	console.log('state', state);
	if (!Object.keys(state).includes(id)) throw Error(`property ${id} is not present in the state object`);

	const [showText, setShowText] = useState(false);
	const inputType = showText ? 'text' : 'password'

	return (
		<fieldset className={'simple-form-input'}>

			<input
				value={state[id]}
				onChange={(e) => setState({ ...state, [id]: e.target.value })}
				type={inputType}
				name={placeholder}
				placeholder={' '}
			/>
			<label htmlFor={id}>{placeholder}</label>

			<button onClick={
				(e) => {
					e.preventDefault();
					setShowText(!showText)
				}
			}
			>
				{showText ? '🚫' : '🔍'}
			</button>
		</fieldset>
	)
}

type ButtonProps = {
	action: () => void,
	children: ReactNode
};

SimpleForm.Button = function Button({ action, children }: ButtonProps) {
	return (
		<button
			className={`simple-form-button`}
			onClick={(e) => { e.preventDefault(); action(); }}
		>
			{children}
		</button>
	)
}

type LinkProps = {
	href: string,
	children: ReactNode
};

SimpleForm.TextLink = function TextLink({ href, children }: LinkProps) {
	return (
		<Link href={href}>
			<span className="simple-form-link">{children}</span>
		</Link>
	)
}