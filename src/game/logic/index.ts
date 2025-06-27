import { state } from "@/game/state";
import { Mortgage, Loan, CreditCard } from "@/game/logic/products";
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

  // Tick products
  if (state.products.mortgage) new Mortgage(state.products.mortgage).tick();
  state.products.loans.forEach((loanData) => new Loan(loanData).tick());
  if (state.products.creditCard) new CreditCard(state.products.creditCard).tick();

  updateCreditScore();
  updateIncome();

  // Recalculate financial stats
  state.debt =
    (state.products.mortgage?.balance || 0) +
    state.products.loans.reduce((acc, l) => acc + l.balance, 0) +
    (state.products.creditCard?.balance || 0);
  state.netWorth = state.money + state.products.savings.balance - state.debt;

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
  const eduBoost = getEducationMultiplier(state.education.level);
  state.income = Math.floor(baseSalary * eduBoost);
  state.money += state.income;
}

function checkBankruptcy() {
  const criticallyNegativeMoney = state.money < -1000;
  const hopelessDebt = state.netWorth < -2000 && state.debt > 10000;

  if (criticallyNegativeMoney || hopelessDebt) {
    state.alive = false;
    state.transcript.push("You have gone bankrupt and can no longer continue.");
    // Optionally clear job, stop income, etc.
  }
}

function getEducationMultiplier(edu: string | undefined): number {
  switch (edu) {
    case "Highschool":
      return 0.7;
    case "Vocational":
      return 1.2;
    case "Undergrad":
      return 1.4;
    case "Graduate":
      return 2.5;
    default:
      return 0.7;
  }
}

export function resetGame() {
  state.age = 16;
  state.money = 0;
  state.job = null;
  state.education = { inSchooling: true, level: "Highschool" };
  state.alive = true;
  state.transcript = [];
  state.debt = 0;
  state.netWorth = 0;
  state.creditScore = 0;
  state.income = 0;
  state.expenses = 0;
  state.totalPayments = 0;
  state.onTimePayments = 0;
  state.yearsCredit = 0;
  // reset other fields as needed
};
