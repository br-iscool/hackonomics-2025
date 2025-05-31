import { useGameStore } from '@/game/state';
import { FinancialProduct } from './products/financialProduct';
const GameState = useGameStore.getState();
const { finance } = GameState;

export const Finances = {
    nextTurn() {
        /*
        - Pay for current expenditures (loans)
        - Update credit score
        */

        finance.creditCards.forEach((card : FinancialProduct) => {
            card.nextTurn();
        });

        finance.loans.forEach((loan : FinancialProduct) => {
            loan.nextTurn();
        });

        if (finance.savings) finance.savings.nextTurn();
        if (finance.debt) finance.debt.nextTurn();
        if (finance.mortgage) finance.mortgage.nextTurn();
        if (finance.insurance) finance.insurance.nextTurn();

        finance.investments.forEach((investment : FinancialProduct) => {
            investment.nextTurn();
        });

        // calculate credit score
        
    },
}