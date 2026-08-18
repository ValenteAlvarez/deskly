import { TicketRead } from "@/lib/types"
import { CSSProperties } from "react"
import './state-label.scss';
type LabelProps = {
	state: TicketRead["state"]
}
export default function StateLabel({state}: LabelProps) {
	const labelColor = (() => {
		switch(state) {
			case 'open':
				return '#4280d2';
			case 'in_progress':
				return '#f5e042';
			case 'resolved':
				return '#4fbb47'
			case 'closed':
				return '#ababab';
			case 'reopened':
				return '#e26c32';
			default: 
				return '#e1e1e1';
		}
	})();

	const labelText = (() => {
		switch(state) {
			case 'open':
				return 'Open';
			case 'in_progress':
				return 'In Progress';
			case 'resolved':
				return 'Resolved'
			case 'closed':
				return 'Closed';
			case 'reopened':
				return 'Re-opened';
			default: 
				return '';
		}
	})();

	return (
	<div 
		className="state-label" 
		style={ { '--state-color': labelColor } as CSSProperties}
	>
		{labelText}
	</div>)
}