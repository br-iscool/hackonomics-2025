import { MortgageData } from "@/game/types";
import { Card, CardContent } from "@/components/ui/card";
import { FaHome } from "react-icons/fa";

export function MortgageCard({ data }: { data: MortgageData }) {
	return (
		<Card className="col-span-1">
			<CardContent className="p-4">
				<div className="flex items-center gap-2">
					<FaHome /> <span className="font-semibold">{data.name}</span>
				</div>
				<div className="text-sm mt-2">Balance: ${data.balance.toLocaleString()}</div>
				<div className="text-sm">Interest: {(data.interestRate * 100).toFixed(2)}%</div>
				<div className="text-sm">Term: {data.termYears} years</div>
				<div className="text-sm">Elapsed: {data.yearsElapsed} years</div>
				<div className="text-sm">Annual Payment: ${data.annualPayment.toLocaleString()}</div>
				<div className="text-sm">Down Payment: ${data.downPayment.toLocaleString()}</div>
			</CardContent>
		</Card>
	);
}
