import { state } from "@/game/state";
import { tickMortgage, tickLoan, tickCreditCard, tickSavings } from "@/game/logic/products";
import { handleEvents } from "@/game/logic/events";

export function gameLoop() {
  if (!state.alive) return;

  state.age += 1;

  //Life stuff
  if (state.job) state.job.yearsEmployed++;
  if (state.education.inSchooling) {
    if (state.education.tuition) state.money -= state.education.tuition;
    if (state.education.yearsUntilGrad) state.education.yearsUntilGrad--;
  }
  if (state.housing.type === "Apartment" && state.housing.rent) state.money -= state.housing.rent;

  // Update products
  if (state.products.mortgage) tickMortgage(state.products.mortgage);
  state.products.loans.forEach(tickLoan);
  if (state.products.creditCard) tickCreditCard(state.products.creditCard);
  if (state.products.savings) tickSavings(state.products.savings);

  updateCreditScore();
  updateIncome();

  // Recalculate financial stats
  state.debt =
    (state.products.mortgage?.balance || 0) +
    state.products.loans.reduce((acc, l) => acc + l.balance, 0) +
    (state.products.creditCard?.balance || 0);

  // Trigger events
  handleEvents(state.age);

  checkBankruptcy();
}

function updateCreditScore() {
  state.paymentHistory = state.onTimePayments / (state.totalPayments || 1);
  const creditHistory = state.yearsCredit / 10; // approximate

  state.creditScore = (state.paymentHistory * 0.7 + creditHistory * 0.3) * 600 + 300;
}

function updateIncome() {
  if (!state.job) return;

  const baseSalary = state.job.salary;
  state.income = Math.floor(baseSalary);
  state.money += state.income;
}

function checkBankruptcy() {
  const criticallyNegativeMoney = state.money < -1000;
  const hopelessDebt = state.money < -2000 && state.debt > 10000;

  if (criticallyNegativeMoney || hopelessDebt) {
    state.alive = false;
    state.transcript.push("You have gone bankrupt and can no longer continue.");
    // Optionally clear job, stop income, etc.
  }
}

export function resetGame() {
  state.age = 16;
  state.money = 5000;
  state.job = null;
  state.education = { inSchooling: true, level: "Highschool" };
  state.alive = true;
  state.transcript = [];
  state.debt = 0;
  state.creditScore = 0;
  state.income = 0;
  state.expenses = 0;
  state.totalPayments = 0;
  state.onTimePayments = 0;
  state.yearsCredit = 0;
  // reset other fields as needed
}
