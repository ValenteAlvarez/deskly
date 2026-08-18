import { ReactNode } from "react";
import './stacks.scss';

type Alignments = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch';

type VStackProps = {
	children: ReactNode,
	className?: string,
	mainAlign?: Alignments,
	horizontalAlign?: Alignments,
	gap?: number
}
export function VStack({
	children, 
	className='',
	mainAlign = 'center', 
	horizontalAlign = 'center',
	gap = 0
}: VStackProps) {
	return (
		<div 
		className={`VStack ${className}`} 
		style={{
			justifyContent: mainAlign, 
			alignItems: horizontalAlign,
			gap: gap
		}}>
			{children}
		</div>
	)
}

type HStackProps = {
	children: ReactNode,
	className?: string,
	mainAlign?: Alignments,
	verticalAlign?: Alignments,
	gap?: number
}
export function HStack({
	children, 
	className = '',
	mainAlign = 'center', 
	verticalAlign = 'center',
	gap = 0
}: HStackProps) {
	return (
		<div
		className={`HStack ${className}`} 
		style={{
			justifyContent: mainAlign, 
			alignItems: verticalAlign,
			gap: gap
		}}
		>
			{children}
		</div>
	)
}