import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import { CreditCard } from "@/components/products/CreditCard";
import { SavingsCard } from "./products/SavingsCard";

export default function Products() {
	const snap = useSnapshot(state);
	console.log(!!snap.products.savings)

	const { creditCard, loans, savings, mortgage, insurance, investments } = snap.products;

	return (
		<div className="flex items-center space-y-4 p-6">
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
