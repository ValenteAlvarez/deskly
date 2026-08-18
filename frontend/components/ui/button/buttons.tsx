'use client'
import './buttons.scss'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function NavigateButton({children, path, id, backgroundColor, icon}: {children?: React.ReactNode, path: string, id?: string, backgroundColor?: string, icon?: string, external?: boolean}) {
	const router = useRouter()
	return (
		<button
			id={id ? id : ''} 
			className={'navigate-button'}
			onClick={() => router.push(`${path}`)}
			style={backgroundColor ? {backgroundColor: backgroundColor} : {}}
		>
			{icon ? <Image src={icon} alt={''} width={20} height={20}/> : ''}
			{children}
		</button>
	)
}

export function LinkButton({children, url, backgroundColor, icon, external}: {children?: React.ReactNode, url: string, id?: string, backgroundColor?: string, icon?: string, external?: boolean}) {
	return (
		<a
			href={url}
			target={external ? '_blank' : ''}
			className={'link-button'}
			style={backgroundColor ? {backgroundColor: backgroundColor} : {}}
		>
			{icon ? <Image src={icon} alt={''} width={20} height={20}/> : ''}
			{children}
		</a>
	)
}

type TextButtonType = {
	children?: React.ReactNode, 
	handleClick: () => void, 
	backgroundColor?: string, 
	textColor: string, 
	icon?: string,
	className?: string,
	isDisabled?: boolean
}

export function TextButton({
	children,
	handleClick,
	textColor,
	backgroundColor='',
	icon='',
	className='',
	isDisabled=false
	
}: TextButtonType) {
	return (
		<button
			disabled={isDisabled}
			className={`text-button ${className}`}
			style={{
				backgroundColor: backgroundColor,
				color: textColor,
				opacity: isDisabled ? '0.3' : '1'
			}}
			onClick={(e) => {
				e.preventDefault();
				handleClick();
			}}
		>
			{icon ? <Image src={icon} alt={''} width={20} height={20}/> : ''}
			{children}
		</button>
	)
}