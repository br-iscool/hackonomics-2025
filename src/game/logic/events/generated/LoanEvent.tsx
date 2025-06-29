import { IEvent, LoanData } from "@/game/types";
import { state } from "@/game/state";

import Color from "@/components/ui/color";

export function LoanEvent(loan: LoanData, purchase: () => void) {
    return new NormalEvent(
        "Confirm Loan",
        (eventData: LoanData) => (
            <div>
                <p>
                    This is quite expensive!``
                    Would you like to pay for it through a loan of <strong>${eventData.principal.toLocaleString()}</strong> 
                    with an interest rate of <strong>{(eventData.interestRate * 100).toFixed(2)}% </strong>
                    for <strong>{eventData.termYears}</strong> years?
                </p>
            </div>
        ),
        choices: [
            {
                label: "Get a loan",
                execute: (eventData: LoanData) => {
                    //double check if you can take a loan w credit score
                    state.products.loans.push({ ...eventData });
                    purchase();

                    return <p>You have received <Color>${eventData.principal.toLocaleString()}</Color> from the loan.</p>
                },
            },
            {
                label: "Pay with cash",
                execute: (eventData: LoanData) => {
                    //pays upfront
                    state.money -= eventData.principal;
                    purchase();
                },
            },
            {
                label: "Cancel",
                execute: () => <p>"Loan declined."</p>,
            },
        ],
        eventData: loan
    }
}
