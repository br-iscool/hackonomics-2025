import { state } from "@/game/state";
import { Mortgage, Loan, CreditCard } from "@/game/engine/financeManager/products";
import { handleEvents } from "@/game/engine/events";

export function gameLoop() {
  state.age += 1;

  // Tick products
  if (state.products.mortgage) new Mortgage(state.products.mortgage).tick();
  state.products.loans.forEach((loanData) => new Loan(loanData).tick());
  if (state.products.creditCard) new CreditCard(state.products.creditCard).tick();

  updateCreditScore();

  // Recalculate financial stats
  state.debt =
    (state.products.mortgage?.principal || 0) +
    state.products.loans.reduce((acc, l) => acc + l.amount, 0) +
    (state.products.creditCard?.balance || 0);
  state.netWorth = state.money + state.products.savings - state.debt;

  // Trigger events
  handleEvents(state.age);
}

function updateCreditScore() {
  state.paymentHistory = state.onTimePayments / state.totalPayments;
  const creditHistory = state.yearsCredit / 10; // approximate

  state.creditScore = (state.paymentHistory * 0.7 + creditHistory * 0.3) * 600 + 300;
}
