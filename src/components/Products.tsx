import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import { CreditCard } from "@/components/products/CreditCard";
import { SavingsCard } from "./products/SavingsCard";

export default function Products() {
	const snap = useSnapshot(state);
	console.log(!!snap.products.savings)

	const { creditCard, loans, savings, mortgage, insurance, investments } = snap.products;

	return (
		<div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-auto-rows-5 gap-4 p-4">
			{creditCard && <CreditCard data={creditCard} />}
			{savings && <SavingsCard data={savings} />}
			{/* {loans.length > 0 &&
				loans.map((loan: any, i: number) => <LoanInfo key={i} data={loan} />)}
			{mortgage && <MortgageInfo data={mortgage} />}
			{insurance && <InsuranceInfo data={insurance} />}
			{investments.length > 0 &&
				investments.map((inv: any, i: number) => <InvestmentInfo key={i} data={inv} />)} */}
		</div>
	);
}
