import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './global.css';
import { Provider } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deskly",
  description: "Ticket management system",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
	<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
		<Provider>
			<body>
				{children}
			</body>
		</Provider>
	</html>);
}
