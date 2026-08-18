import { CSSProperties, ReactNode } from "react";
import './card.scss';


type CardProps = {
	children: ReactNode,
	className?: string,
	backgroundColor?: string;
	borderRadius?: number;
	borderWidth?: number
	borderColor?: string,
	padding?: number
	boxShadow?: {
		xOffset: number
		yOffset: number
		spread: number
		color: string
	}
}
export function Card({
	children,
	className = '',
	backgroundColor = 'rgb(255, 255, 255)',
	borderRadius = 10,
	borderWidth = 0,
	borderColor = 'rgb(0, 0, 0)',
	padding = 4,
	boxShadow = {
		xOffset: 0,
		yOffset: 0,
		spread: 15,
		color: 'rgba(176, 176, 176, 0.2)'
	}
}: CardProps) {
	const styles: CSSProperties = {
		backgroundColor,
		borderRadius: `${borderRadius}px`,
		borderWidth: `${borderWidth}px`,
		borderColor,
		padding: `${padding}px`,
		boxShadow: `${boxShadow.xOffset}px ${boxShadow.yOffset}px ${boxShadow.spread}px ${boxShadow.color}`

	}
	return (
		<article className={`card ${className}`} style={styles}>
			{children}
		</article>
	)
}