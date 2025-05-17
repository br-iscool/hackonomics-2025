import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
	title: "Financial Literacy App",
	description: "Learn more about financial literacy!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${jetBrainsMono.className} antialiased`}>{children}</body>
		</html>
	);
}