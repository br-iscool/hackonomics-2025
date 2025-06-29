import { IEvent, LoanData } from "@/game/types";
import { state } from "@/game/state";

export function LoanEvent(loan: LoanData): IEvent {
    return {
        name: "Confirm Loan",
        body: (eventData: LoanData) => (
            <div>
                <p>
                    Do you want to take out a loan of <strong>${eventData.principal.toLocaleString()}</strong>
                    with an interest rate of <strong>{(eventData.interestRate * 100).toFixed(2)}%</strong>
                    for <strong>{eventData.termYears}</strong> years?
                </p>
            </div>
        ),
        choices: [
            {
                label: "Confirm",
                execute: (eventData: LoanData) => {
                    state.products.loans.push({ ...eventData });
                    state.money += eventData.principal;

                    return <p>`You have received $${eventData.principal.toLocaleString()} from the loan.`</p>
                },
            },
            {
                label: "Cancel",
                execute: () => <p>"Loan cancelled."</p>,
            },
        ],
        eventData: () => loan
    }
}
