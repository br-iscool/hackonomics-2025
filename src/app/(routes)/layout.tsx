import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/app/styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
	title: "Balancing Act",
	description: "Learn more about financial literacy with our awesome game! Balancing Act is a financial life simulation game where you make important decisions and balance your life.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				{children}
				<Analytics />
				<SpeedInsights />
				<Toaster richColors position="bottom-right" />
			</body>
		</html>
	);
}