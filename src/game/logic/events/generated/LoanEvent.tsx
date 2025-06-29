import { NormalEvent } from "@/game/logic/events/eventsClasses";
import { LoanData } from "@/game/types";
import { state } from "@/game/state";

import Color from "@/components/ui/color";

export function LoanEvent(loan: LoanData) {
    return new NormalEvent(
        "Confirm Loan",
        (eventData: LoanData) => (
            <div>
                <p>
                    You've ran out of money!
                    Do you want to take out a loan of <strong>${eventData.principal.toLocaleString()}</strong> 
                    with an interest rate of <strong>{(eventData.interestRate * 100).toFixed(2)}% </strong>
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

                    return <p>You have received <Color>${eventData.principal.toLocaleString()}</Color> from the loan.</p>
                },
            },
            {
                label: "Cancel",
                execute: () => <p>"Loan declined."</p>,
            },
        ],
        () => loan
    );
}
