import { NormalEvent } from "@/game/logic/events/eventsClasses";
import { LoanData } from "@/game/types";
import { state } from "@/game/state";

export function LoanEvent(loan: LoanData) {
    return new NormalEvent(
        "Confirm Loan",
        (eventData: LoanData) => (
            <div>
                <p>
                    Do you want to take out a loan of <strong>${eventData.principal.toLocaleString()}</strong>
                    with an interest rate of <strong>{(eventData.interestRate * 100).toFixed(2)}%</strong>
                    for <strong>{eventData.termYears}</strong> years?
                </p>
            </div>
        ),
        [
            {
                label: "Confirm",
                execute: (eventData: LoanData) => {
                    state.products.loans.push({ ...eventData });
                    state.money += eventData.principal;

                    return `You have received $${eventData.principal.toLocaleString()} from the loan.`
                },
            },
            {
                label: "Cancel",
                execute: () => "Loan cancelled.",
            },
        ],
        () => loan
    );
}
