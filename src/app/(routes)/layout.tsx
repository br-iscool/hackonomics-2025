import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "@/app/styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
	title: "Financial Literacy App",
	description: "Learn more about financial literacy",
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
				<Toaster richColors position="bottom-right" />
			</body>
		</html>
	);
}