import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FaWallet, FaDollarSign, FaMoneyBillWave, FaScaleBalanced, FaPiggyBank, FaCreditCard, FaChartLine, FaBuildingColumns } from "react-icons/fa6";

export default function FinanceInfoDialog() {
	const snap = useSnapshot(state);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-40 h-16 text-lg" variant="default">
					{"Finances"}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<FaWallet className="text-muted-foreground" /> Financial Overview
					</DialogTitle>
				</DialogHeader>

				<div className="p-4 space-y-6">
					{/* Overview */}
					<Section title="Overview">
						<InfoRow icon={<FaDollarSign />} label="Money" value={`$${snap.money.toLocaleString()}`} />
						<InfoRow icon={<FaChartLine />} label="Net Worth" value={`$${snap.netWorth.toLocaleString()}`} />
					</Section>

					{/* Budgeting */}
					<Section title="Budgeting">
						<InfoRow icon={<FaMoneyBillWave />} label="Income" value={`$${snap.income.toLocaleString()}`} />
						<InfoRow icon={<FaScaleBalanced />} label="Expenses" value={`$${snap.expenses.toLocaleString()}`} />
						<InfoRow icon={<FaPiggyBank />} label="Budget" value={`$${snap.budget.toLocaleString()}`} />
					</Section>

					{/* Debt & Credit */}
					<Section title="Debt & Credit">
						<InfoRow icon={<FaCreditCard />} label="Debt" value={`$${snap.debt.toLocaleString()}`} />
						<InfoRow icon={<FaBuildingColumns />} label="Credit Score" value={snap.creditScore} />
						<InfoRow icon={<FaChartLine />} label="Years of Credit" value={snap.yearsCredit} />
					</Section>

					{/* Payment Performance */}
					<Section title="Payment History">
						<InfoRow icon={<FaChartLine />} label="On-time Payments" value={snap.onTimePayments} />
						<InfoRow icon={<FaChartLine />} label="Total Payments" value={snap.totalPayments} />
					</Section>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
	return (
		<div className="flex items-center gap-3">
			<div className="text-muted-foreground">{icon}</div>
			<span className="font-medium">{label}:</span>
			<span>{value}</span>
		</div>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="space-y-2">
			<h3 className="text-lg font-semibold">{title}</h3>
			<div className="space-y-2 pl-1">{children}</div>
		</div>
	);
}
