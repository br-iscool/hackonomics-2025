import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import { CreditCard } from "@/components/products/CreditCard";
import { SavingsCard } from "./products/SavingsCard";
import { LoanCard } from "./products/LoanCard";
import { MortgageCard } from "./products/MortgageCard";

export default function Products() {
	const snap = useSnapshot(state);

	const { creditCard, loans, savings, mortgage, insurance, investments } = snap.products;

	return (
		<div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-auto-rows-5 gap-4 p-4">
			{creditCard && <CreditCard data={creditCard} />}
			{savings && <SavingsCard data={savings} />}
			{loans.length > 0 &&
				loans.map((loan: any, i: number) => <LoanCard key={i} data={loan} />)}
			{mortgage && <MortgageCard data={mortgage} />}
		</div>
	);
}
