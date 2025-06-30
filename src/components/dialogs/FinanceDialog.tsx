import { useSnapshot } from "valtio";
import { state } from "@/game/logic/game-state";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@/components/ui/tabs";

import {
	FaWallet,
	FaDollarSign,
	FaMoneyBillWave,
	FaScaleBalanced,
	FaCreditCard,
	FaChartLine,
	FaBuildingColumns,
	FaReceipt,
} from "react-icons/fa6";

export default function FinanceDialog() {
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

				<Tabs defaultValue="overview" className="mt-4">
					<TabsList className="grid w-full grid-cols-5">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="income">Income</TabsTrigger>
						<TabsTrigger value="debt">Debt</TabsTrigger>
						<TabsTrigger value="history">History</TabsTrigger>
						<TabsTrigger value="expenses">Expenses</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<div className="pt-4 space-y-4">
							<Section title="Account">
								<InfoRow icon={<FaDollarSign />} label="Money" value={`$${snap.money.toLocaleString()}`} />
							</Section>
						</div>
					</TabsContent>

					<TabsContent value="income">
						<div className="pt-4 space-y-4">
							<Section title="Income">
								<InfoRow icon={<FaMoneyBillWave />} label="Income" value={`$${snap.income.toLocaleString()}`} />
							</Section>
						</div>
					</TabsContent>

					<TabsContent value="debt">
						<div className="pt-4 space-y-4">
							<Section title="Debt & Credit">
								<InfoRow icon={<FaCreditCard />} label="Debt" value={`$${snap.debt.toLocaleString()}`} />
								<InfoRow icon={<FaBuildingColumns />} label="Credit Score" value={snap.creditScore} />
								<InfoRow icon={<FaChartLine />} label="Years of Credit" value={snap.yearsCredit} />
							</Section>
						</div>
					</TabsContent>

					<TabsContent value="history">
						<div className="pt-4 space-y-4">
							<Section title="Payment History">
								<InfoRow icon={<FaChartLine />} label="On-time Payments" value={snap.onTimePayments} />
								<InfoRow icon={<FaChartLine />} label="Total Payments" value={snap.totalPayments} />
							</Section>
						</div>
					</TabsContent>

					<TabsContent value="expenses">
						<div className="pt-4 space-y-4">
							<Section title="Expenses Breakdown">
								{Object.entries(snap.expenses).map(([category, amount]) => (
									<InfoRow
										key={category}
										icon={<FaReceipt />}
										label={capitalize(category)}
										value={`$${amount.toLocaleString()}`}
									/>
								))}
								<InfoRow
									icon={<FaScaleBalanced />}
									label="Total"
									value={`$${state.totalExpenses.toLocaleString()}`}
								/>
							</Section>
						</div>
					</TabsContent>
				</Tabs>
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

function capitalize(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}
