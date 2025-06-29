import { state } from "@/game/state";
import { tickMortgage, tickLoan, tickCreditCard, tickSavings } from "@/game/logic/products";
import { handleEvents } from "@/game/logic/events";

export function gameLoop() {
  if (!state.alive) return;

  state.age += 1;

  //Life stuff
  if (state.job) state.job.yearsEmployed++;
  if (state.education.inSchooling) {
    if (state.education.yearsUntilGrad) {
      state.education.yearsUntilGrad--;

      // Check if graduation
      if (state.education.yearsUntilGrad <= 0) {
        state.education.inSchooling = false;

        // Add message to transcript
        let graduationMessage = "";
        switch (state.education.level) {
          case "Vocational":
            graduationMessage =
              "Congratulations! You've completed your trade school education and are now ready to enter the workforce!";
            break;
          case "Undergrad":
            graduationMessage =
              "Congratulations! You've graduated from university with your bachelor's degree!";
            break;
          case "Grad":
            if (state.education.field === "Medicine") {
              graduationMessage =
                "Congratulations! You've completed medical school and are now a licensed doctor!";
            } else if (state.education.field === "Law") {
              graduationMessage =
                "Congratulations! You've completed law school and are now a licensed lawyer!";
            } else {
              graduationMessage =
                "Congratulations! You've completed graduate school and earned your advanced degree!";
            }
            break;
          default:
            graduationMessage = "Congratulations on completing your education!";
        }

        state.transcript.push(graduationMessage);
      }
    }
  }

  // Update products
  if (state.products.mortgage) tickMortgage(state.products.mortgage);
  state.products.loans.forEach(tickLoan);
  if (state.products.creditCard) tickCreditCard(state.products.creditCard);
  if (state.products.savings) tickSavings(state.products.savings);

  updateIncome();

  // Update money based on expenses
  Object.keys(state.expenses).forEach((category) => {
    const expenseCost = state.expenses[category];
    state.money -= expenseCost; // Subtract the expense from the total money
  });

  // Trigger events
  handleEvents(state.age);

  if (state.isBankrupt) {
    state.alive = false;
    state.transcript.push("You have gone bankrupt and can no longer continue.");
    // Optionally clear job, stop income, etc.
  }
}

export function canPurchase(cost: number) {
  return state.money >= cost;
}

function updateIncome() {
  if (!state.job) return;

  const baseSalary = state.job.salary;
  state.income = Math.floor(baseSalary);
  state.money += state.income;
}

export function resetGame() {
  state.age = 16;
  state.money = 5000;
  state.name = "";
  state.opened = true;
  state.job = null;
  state.education = { inSchooling: true, level: "Highschool" };
  state.alive = true;
  state.transcript = [];
  state.income = 0;
  state.expenses = {};
  state.totalPayments = 0;
  state.onTimePayments = 0;
  state.yearsCredit = 0;
  // reset other fields as needed
}

export function startGame() {
  state.opened = false;
  state.transcript.push(
    `Welcome to Balancing Act, ${state.name}! Your economic journey begins now.`
  );
}
