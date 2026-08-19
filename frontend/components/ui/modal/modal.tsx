'use client'
import { CSSProperties, MouseEvent } from 'react';
import './modal.scss'

type FullscreenModalProps = {
	handleClose: () => void
	children: React.ReactNode,
	canCloseWithOverlay?: boolean
	centerContent?: boolean
}

export default function FullscreenModal({ handleClose, children, canCloseWithOverlay=true, centerContent=true}: FullscreenModalProps) {

	const styles = {
		justifyContent: `${centerContent ? 'center' : 'stretch'}`, 
		alignItems: `${centerContent ? 'center' : 'stretch'}`
	}

	return (	
		<aside className='fullscreen-modal'>
			<ModalOverlay
				styles={styles}
				handleClick={(e) => { 
					e.stopPropagation();
					if (canCloseWithOverlay && e.target === e.currentTarget) handleClose() 
				}}
			>
				<div 
					className='modal-content-wrapper' 
					style={{flex: `${!centerContent ? '1 1' : 'initial'}`}}
				>
					{children}
				</div>
			</ModalOverlay>
		</aside>
	)
}

type ModalOverlayProps = {
	children?: React.ReactNode
	handleClick: (e: MouseEvent) => void
	styles?: CSSProperties
}
function ModalOverlay({children, handleClick, styles={}}: ModalOverlayProps) {
	return (
		<div 
			style={styles}
			className='modal-overlay'
			onClick={(e) => handleClick(e)}
		>
			{children}
		</div>
	)
}