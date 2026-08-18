type SeparatorProps = {
	color?: string,
	borderWidth?: number,
	style?: string,
	width: string | number
}
export default function Separator({color,borderWidth, width, style}: SeparatorProps){
	return <div style={{
		borderWidth: borderWidth || 1,
		borderColor: color || 'black',
		borderStyle: style || 'solid',
		width: width || 'auto'
	}}></div>
}