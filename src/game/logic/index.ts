import { state } from "@/game/state";
import { Mortgage, Loan, CreditCard } from "@/game/logic/products";
import { handleEvents } from "@/game/logic/events";

export function gameLoop() {
  state.age += 1;
  console.log(`Aging up to ${state.age}`);

  // Tick products
  if (state.job) state.job.yearsEmployed++;
  if (state.education.inSchooling) {
    if (state.education.tuition) state.money -= state.education.tuition;
    if (state.education.yearsUntilGrad) state.education.yearsUntilGrad--;
  }
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
  console.log(state.event);
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
  state.context.householdIncome = state.income;
}

function getJobSalary(job: string | undefined): number {
  switch (job) {
    case "Engineer":
      return 80000;
    case "Teacher":
      return 50000;
    case "Doctor":
      return 120000;
    case "Retail":
      return 30000;
    default:
      return 0;
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
