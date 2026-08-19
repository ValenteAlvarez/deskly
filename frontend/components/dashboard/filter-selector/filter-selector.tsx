'use client'
import { LinkButton } from "@/components/ui/button/buttons";
import { VStack } from "@/components/ui/stacks/stacks";
import { addSearchParam, removeSearchParams } from "@/lib/editSearchParams";
import { TicketPriority } from "@/lib/types";
import { usePathname, useSearchParams } from "next/navigation";

export default function FilterSelector() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const filterOptions: TicketPriority[] = ['low', 'medium', 'high', 'critical'];

	return (
	<VStack horizontalAlign="stretch" gap={12} className="action-sidebar-filter-options">
		<h1 className="action-sidebar-filter-title">Priority Filter</h1>

		<LinkButton url={`${pathname}${searchParams ? `?${removeSearchParams(removeSearchParams(searchParams, 'page'), 'priority')}` : ''}`}>
			<span className="action-sidebar-filter-option">All</span>
		</LinkButton>
		{filterOptions.map(option => (
		<LinkButton key={option} url={`${pathname + '?' + addSearchParam(removeSearchParams(searchParams, 'page'), 'priority', option)}`}>
			<span className="action-sidebar-filter-option">{option}</span>
		</LinkButton>)
		)}
	</VStack>
	)
}