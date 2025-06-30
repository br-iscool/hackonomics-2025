import { useSnapshot } from "valtio";
import { state } from "@/game/logic/game-state";

import { CreditCard } from "@/components/products/CreditCard";
import { Car } from "./products/Car";
import { SavingsCard } from "./products/SavingsCard";
import { LoanCard } from "./products/LoanCard";

export default function Products() {
	const snap = useSnapshot(state);

	const { creditCard, car, loans, savings } = snap.products;

	return (
		<div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
			{creditCard && <CreditCard />}
			{car && <Car />}
			{savings && <SavingsCard data={savings} />}
			{loans.length > 0 &&
				loans.map((loan: any, i: number) => <LoanCard key={i} data={loan} />)}
		</div>
	);
}
