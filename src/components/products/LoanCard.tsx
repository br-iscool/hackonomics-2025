import { LoanData } from "@/game/types";
import { Card, CardContent } from "@/components/ui/card";
import { FaUniversity } from "react-icons/fa";

export function LoanCard({ data }: { data: LoanData }) {
	return (
		<Card className="col-span-1">
			<CardContent className="p-4">
				<div className="flex items-center gap-2">
					<FaUniversity /> <span className="font-semibold">{data.name}</span>
				</div>
				<div className="text-sm mt-2">Balance: ${data.balance.toLocaleString()}</div>
				<div className="text-sm">Interest: {(data.interestRate * 100).toFixed(2)}%</div>
				<div className="text-sm">Term: {data.termYears} years</div>
				<div className="text-sm">Elapsed: {data.yearsElapsed} years</div>
			</CardContent>
		</Card>
	);
}
