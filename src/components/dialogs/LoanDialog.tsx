import { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { state } from "@/game/logic/game-state";
import { uistate } from "@/lib/state";
import { LoanData } from "@/game/types/game-types";
import { randomInterval } from "@/lib/utils";
import { FaLandmark, FaPercentage, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

type LoanOption = Omit<LoanData, "active" | "yearsElapsed" | "balance" | "downPayment">;

const generateLoanOptions = (): LoanOption[] => {
	const banks = ["TD Bank", "National Bank", "Secure Bank"];
	const options: LoanOption[] = [];
	for (let i = 0; i < 3; i++) {
		const principal = randomInterval(5, 20) * 1000; // $5,000 - $20,000
		options.push({
			id: `loan-${Date.now()}-${i}`,
			name: banks[i % banks.length],
			principal,
			interestRate: randomInterval(5, 15) / 100, // 5% - 15%
			termYears: chooseRandom([5, 7, 10]),
		});
	}
	return options;
};

const chooseRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function LoanDialog() {
    const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
    const uiSnap = useSnapshot(uistate);

    useEffect(() => {
        if (uiSnap.showLoanDialog) {
            setLoanOptions(generateLoanOptions());
        }
    }, [uiSnap.showLoanDialog]);

    const handleSelectLoan = (option: LoanOption) => {
		const newLoan: LoanData = {
			...option,
			active: true,
			balance: option.principal,
			yearsElapsed: 0,
			downPayment: 0,
		};
		state.money += newLoan.principal;
		state.products.loans.push(newLoan);
		state.transcript.push(`You have taken out a loan of $${newLoan.principal.toLocaleString()} from ${newLoan.name}.`);
		uistate.showLoanDialog = false;
	};

    return (
        <Dialog open={uiSnap.showLoanDialog} onOpenChange={(open) => (uistate.showLoanDialog = open)}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Apply for a Loan</DialogTitle>
                </DialogHeader>
                <div className="p-2">
                    <p className="text-sm text-muted-foreground pb-3">
                        Choose a loan that best fits your needs. The amount will be added to your balance, but you will have to pay it back eventually with interest.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {loanOptions.map((option) => (
                            <Card key={option.id}>
                                <CardContent className="p-4 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="font-semibold flex items-center gap-2 mb-3">
                                            <FaLandmark /> {option.name}
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2"><FaMoneyBillWave /> Amount: ${option.principal.toLocaleString()}</div>
                                            <div className="flex items-center gap-2"><FaPercentage /> Interest: {(option.interestRate * 100).toFixed(2)}%</div>
                                            <div className="flex items-center gap-2"><FaCalendarAlt /> Term: {option.termYears} years</div>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4" onClick={() => handleSelectLoan(option)}>
                                        Accept Loan
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}