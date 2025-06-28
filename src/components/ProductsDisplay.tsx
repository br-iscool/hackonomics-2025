import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import { CreditCard } from "@/components/products/CreditCard";

export default function ProductsDisplay() {
	const snap = useSnapshot(state);

	const { creditCard, loans, savings, mortgage, insurance, investments } = snap.products;

	return (
		<div className="flex flex-col items-center space-y-4 p-4">
			{creditCard && <CreditCard data={creditCard} />}
			{/* {loans.length > 0 &&
				loans.map((loan: any, i: number) => <LoanInfo key={i} data={loan} />)}
			{savings && <SavingsInfo data={savings} />}
			{mortgage && <MortgageInfo data={mortgage} />}
			{insurance && <InsuranceInfo data={insurance} />}
			{investments.length > 0 &&
				investments.map((inv: any, i: number) => <InvestmentInfo key={i} data={inv} />)} */}
		</div>
	);
}
