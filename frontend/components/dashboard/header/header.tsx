'use client'
import Banner from "@/components/ui/banner/banner";
import { HStack } from "@/components/ui/stacks/stacks";
import './header.scss';
import { useTicketStream } from "@/lib/hooks/useTicketStream";

export default function DashboardHeader({}) {
	const connectionStatus = useTicketStream();
	const connectionTone: "subdued" | "info" | "good" | "warning" | "high" | "critical" = (() => {
		switch (connectionStatus){
			case 'disconnected':
				return 'high';
			case 'connecting':
				return 'warning';
			case 'connected':
				return 'good'
		}
	})()

	return (
		<HStack mainAlign="start" verticalAlign="center" gap={12} className="dashboard-header">
			<Banner tone={connectionTone}>{connectionStatus}</Banner>
			<h1>Current Tickets</h1>
		</HStack>
	)
}