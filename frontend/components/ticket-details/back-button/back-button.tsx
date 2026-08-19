'use client'

import { TextButton } from "@/components/ui/button/buttons"
import { useRouter } from "next/navigation"

export function BackButton() {
	const router = useRouter()
	return (
	<TextButton 
		backgroundColor={'var(--v-blue)'} 
		textColor={'white'} 
		handleClick={() => router.back()}
	>
		Back
	</TextButton>
	)
}