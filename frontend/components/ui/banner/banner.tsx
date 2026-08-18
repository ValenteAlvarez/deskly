import { CSSProperties, ReactNode } from "react"
import './banner.scss';
type LabelProps = {
	tone: 'subdued' | 'info' | 'good' | 'warning' | 'high' | 'critical',
	children: ReactNode
}
export default function Banner({tone, children}: LabelProps) {
	const labelColor = (() => {
		switch(tone) {
			case 'subdued':
				return '#abababa0';
			case 'info':
				return '#4280d2a0';
			case 'good':
				return '#4fbb47a0'
			case 'warning':
				return '#f5e042a0';
			case 'high':
				return '#e23232a0';
			case 'critical':
				return '#bf32e2a0';
			default: 
				return '#e1e1e1a0';
		}
	})();

	return (
	<div 
		className="state-label" 
		style={ { '--state-color': labelColor } as CSSProperties}
	>
		{children}
	</div>)
}