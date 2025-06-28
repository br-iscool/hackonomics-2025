import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { resetGame } from "@/game/logic";

export default function GameOverDialog() {
	const snap = useSnapshot(state);

	return (
		<AlertDialog open={!snap.alive}>
			<AlertDialogContent className="max-w-lg">
				<AlertDialogHeader>
					<AlertDialogTitle>Game Over</AlertDialogTitle>
					<AlertDialogDescription>You’ve gone bankrupt and can no longer continue. Here's how your life turned out:</AlertDialogDescription>
				</AlertDialogHeader>

				<Card className="my-4">
					<CardContent className="p-4 space-y-2 text-sm">
						<Stat label="Age Reached" value={snap.age} />
						<Stat label="Education Level" value={snap.education.level} />
						<Stat label="Job" value={snap.job ? `${snap.job.role} (${snap.job.yearsEmployed} yrs)` : "Unemployed"} />
						<Stat label="Final Money" value={`$${snap.money.toLocaleString()}`} />
						<Stat label="Total Debt" value={`$${snap.debt.toLocaleString()}`} />
						<Stat label="Credit Score" value={Math.round(snap.creditScore)} />
						<Stat label="Total Payments Made" value={snap.totalPayments} />
						<Stat label="On-Time Payments" value={snap.onTimePayments} />
						<Stat label="Years of Credit History" value={snap.yearsCredit} />
					</CardContent>
				</Card>

				<AlertDialogFooter>
					<Button onClick={resetGame}>Restart</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function Stat({ label, value }: { label: string; value: string | number }) {
	return (
		<div className="flex justify-between">
			<span className="font-medium">{label}</span>
			<span>{value}</span>
		</div>
	);
}
