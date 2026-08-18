'use client'
import { createContext, CSSProperties, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useRef, useState } from 'react';
import './dropdown.scss';
import { createPortal } from 'react-dom';
import { CSSColor } from '@/lib/utils/types';
import { useClientRect } from '@/lib/hooks/useClientRect';
import useKeypressListener from '@/lib/hooks/useKeypressListener';
import Image from 'next/image';

type DropdownContext = {
	selectedIds: string[],
	setSelectedIds: (newIds: string[] | ((prevState: string[]) => string[])) => void,
	mode: 'click' | 'hover',
	openState: boolean,
	setOpenState: Dispatch<SetStateAction<boolean>>
	handleSingleSelect: (selectedId: string) => void,
	handleMultiselect: (selectedId: string) => void,
	multiselect?: boolean,
	showSelection?: boolean
}

export type DropdownStyles = {
	titleColor: string,
	borderColor: `rgba(${number}, ${number}, ${number}, ${number})` | string,
	backgroundColor: `rgba(${number}, ${number}, ${number}, ${number})` | string,
	borderRadius: `${number}px`,
	primaryColor: `rgba(${number}, ${number}, ${number}, ${number})` | string,
	secondaryColor: `rgba(${number}, ${number}, ${number}, ${number})` | string,
	hoverColor: `rgba(${number}, ${number}, ${number}, ${number})` | string
	selectedColor: `rgba(${number}, ${number}, ${number}, ${number})` | string
}

type DropdownProps = {
	children: ReactNode,
	contextValue: Omit<DropdownContext, 'openState' | 'setOpenState' | 'handleSingleSelect' | 'handleMultiselect'>,
	title?: string | ReactNode,
	styles?: Partial<DropdownStyles>,
	isDisabled?: boolean
	className?: string,
}

const DropdownContext = createContext<DropdownContext | null>(null);

function useDropdownContext() {
	const ctx = useContext(DropdownContext);

	if (!ctx) {
		throw new Error('Component can only be used inside Dropdown root');
	}
	return ctx;
}

function Dropdown({ children, className = '', contextValue, title, styles, isDisabled = false }: DropdownProps) {
	const submenuWrapperRef = useRef<HTMLUListElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [openState, setOpenState] = useState<boolean>(false);
	const submenuRect = useClientRect(submenuWrapperRef as RefObject<HTMLUListElement>);
	const buttonRect = useClientRect(buttonRef as RefObject<HTMLButtonElement>);

	useKeypressListener('Escape', () => setOpenState(false));

	const gapSize = 2;

	type Positions = {
		top?: `${number}px`,
		bottom?: `${number}px`,
		left?: `${number}px`,
		right?: `${number}px`,
	}

	const originalPosition: { [P in keyof Positions]: number | undefined } = (() => {
		return {
			top: buttonRect.left! + buttonRect.height!,
			left: buttonRect.left,
			bottom: buttonRect.bottom! + submenuRect.height!,
			right: buttonRect.left! + submenuRect.width!
		}
	})();

	const newPosition = (() => {
		if (submenuRect.left === undefined || buttonRect.left === undefined) return;

		const temp: Positions = {
			top: `${buttonRect.height! + gapSize}px`,
			left: '0px',
			bottom: undefined,
			right: undefined
		};

		if (originalPosition.bottom! > window.innerHeight) {
			temp.top = undefined;
			temp.bottom = `${buttonRect.height! + gapSize}px`;
		}

		if (originalPosition.right! > window.innerWidth) {
			temp.left = undefined;
			temp.right = '0px';
		}

		return temp;
	})();

	function handleSingleSelect(selectedId: string) {
		contextValue.setSelectedIds([selectedId]);
	}

	function handleMultiselect(selectedId: string) {
		contextValue.setSelectedIds((prevState) => {
			if (prevState.includes(selectedId)) {
				return prevState.filter((item) => item !== selectedId);
			}
			else {
				return [...prevState, selectedId];
			}
		});
	}

	const extendedContextValue = {
		...contextValue,
		openState,
		setOpenState,
		handleSingleSelect,
		handleMultiselect
	}


	return (
		<DropdownContext.Provider value={extendedContextValue}>
			<aside
				className={`dropdown-wrapper ${className}`}
				style={{
					'--title-color': styles?.titleColor || 'black',
					'--dropdown-border-color': styles?.borderColor || 'black',
					'--dropdown-background-color': styles?.backgroundColor || 'white',
					'--dropdown-border-radius': styles?.borderRadius || '4px',
					'--dropdown-hover-color': styles?.hoverColor || 'rgba(0, 0, 0, 0.1)',
					'--dropdown-primary-color': styles?.primaryColor || 'black',
					'--dropdown-secondary-color': styles?.secondaryColor || 'light-gray',
					'--dropdown-selected-color': styles?.selectedColor || 'rgba(0, 0, 0, 0)',
				} as CSSProperties}>
				<DropdownButton title={title} ref={buttonRef} disabled={isDisabled} />
				{openState &&
					createPortal(
						<div
							className={'dropdown-overlay'}
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								if (e.currentTarget.classList.contains('dropdown-overlay')) {
									setOpenState(false)
								}

							}}
							onKeyUp={(e) => {
								if (e.key === 'esc') {
									setOpenState(false)
								}
							}}
						/>, buttonRef.current as Element)}
				<ul
					inert={!openState}
					ref={submenuWrapperRef}
					style={newPosition}
					className={`submenu-wrapper ${openState ? 'open' : ''}`}
					onMouseLeave={() => {
						if (extendedContextValue.mode === 'hover') {
							extendedContextValue.setOpenState(false);
						}
					}}
				>
					{children}
				</ul>
			</aside>
		</DropdownContext.Provider>
	)
}

type DropdownButtonProps = {
	ref: RefObject<HTMLButtonElement | null>
	title?: string | ReactNode,
	showSelection?: boolean,
	disabled?: boolean
}

function DropdownButton({ ref, title, disabled = false }: DropdownButtonProps) {
	const { mode, showSelection, multiselect, selectedIds, setOpenState } = useDropdownContext();
	const timeoutId = useRef<ReturnType<typeof setTimeout>>(undefined);

	const clickButton =
		<button
			disabled={disabled}
			ref={ref}
			className={`dropdown-button ${disabled ? 'disabled' : ''}`}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				if (e.currentTarget.classList.contains('dropdown-button')) {
					setOpenState((currentState) => !currentState);
				}
			}}
		>
			{title && <span className={'dropdown-button-title'}>{title}</span>}
			{showSelection && <span className='dropdown-button-selection'>{multiselect ? `Selected: ${selectedIds.length}` : selectedIds[0]}</span>}
		</button>

	const hoverButton =
		<button
			ref={ref}
			className={'dropdown-button'}
			onMouseEnter={() => {
				clearTimeout(timeoutId.current)
				setOpenState(true);
			}}
		>
			{title}
		</button>

	return mode === 'click' ? clickButton : hoverButton;
}

type DropdownSectionProps = {
	children: ReactNode
}
function DropdownSection({ children }: DropdownSectionProps) {
	return (
		<ul className='dropdown-section'>
			{children}
		</ul>
	)
}

type SectionHeaderProps = {
	children: ReactNode
}
function DropdownSectionHeader({ children }: SectionHeaderProps) {
	return <h2 className='dropdown-section-header'>{children}</h2>
}


type DropdownItemProps = {
	id: string,
	children: ReactNode,
	action?: () => void
}
function DropdownItem({ id, children, action }: DropdownItemProps) {
	const { selectedIds, multiselect, handleSingleSelect, handleMultiselect, setOpenState } = useDropdownContext();
	const isSelected: boolean = selectedIds.includes(id);

	return (
		<li
			className={`dropdown-item ${isSelected ? 'selected' : ''}`}
			onClick={(e) => {
				e.stopPropagation();
				if (action) action();
				if (multiselect) {
					handleMultiselect(id);
				} else {
					handleSingleSelect(id);
					setOpenState(false);
				}
			}}
		>
			{children}
		</li>
	)
}

type DropdownActionItemProps = {
	children: ReactNode,
	color?: CSSColor,
	action: () => void
}
function DropdownActionItem({ children, color, action }: DropdownActionItemProps) {
	return (
		<button
			className={`dropdown-action-item`}
			style={{
				color
			}}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				action();
			}}
		>
			{children}
		</button>
	)
}

type ItemIconProps = {
	iconName: string
}
function DropdownItemIcon({ iconName }: ItemIconProps) {
	return <Image className={'dropdown-item-icon'} alt={''} src={``} width={15} height={15} />
}

Dropdown.Section = DropdownSection;
Dropdown.Item = DropdownItem;
Dropdown.ActionItem = DropdownActionItem;

DropdownSection.Header = DropdownSectionHeader;

DropdownItem.Icon = DropdownItemIcon;

export default Dropdown;

