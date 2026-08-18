import Banner from "@/components/ui/banner/banner";
import { HStack } from "@/components/ui/stacks/stacks";
import './header.scss';

export default function DashboardHeader({}) {
	const fakeConnectionStatus = 'good'

	return (
		<HStack mainAlign="start" verticalAlign="center" gap={12} className="dashboard-header">
			<Banner tone={fakeConnectionStatus}>Connected</Banner>
			<h1>Current Tickets</h1>
		</HStack>
	)
}