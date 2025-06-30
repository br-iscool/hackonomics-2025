import { state } from "@/game/logic/game-state";
import { tickLoan, tickSavings, tickDisease } from "@/game/logic/products";
import { handleEvents } from "@/game/events/event-handler";
import { GradEvent } from "@/game/types/event-types"

export function gameLoop() {
  // Age partner
  if (state.family.spouse) {
    state.family.spouse.age += 1;
    if (state.family.spouse.yearsWithPartner !== undefined) {
      state.family.spouse.yearsWithPartner += 1;
    }
  }

  if (!state.alive) return;

  state.age += 1;

  //Life stuff
  if (state.job) state.job.yearsEmployed++;
  if (state.education.inSchooling && state.education.yearsUntilGrad) {
    state.education.yearsUntilGrad--;

    // Check if graduation
    if (state.education.yearsUntilGrad <= 0) {
      state.events.push(GradEvent());
      
      state.expenses.education = 0;
      state.education.inSchooling = false;
      state.transcript.push(getGradMessage());
    }
  }

  // Credit score stuff
  if (state.products.creditCard) state.yearsCredit++;
  // TODO: add on time payment incrementer

  // Update products
  state.products.loans.forEach(tickLoan);
  if (state.products.savings) tickSavings(state.products.savings);

  updateIncome();

  // Update money based on expenses - use cached totalExpenses
  state.money -= state.totalExpenses;

  // Illness related effects
  state.diseases.forEach(tickDisease);

  // Trigger events
  handleEvents(state.age);

  if (state.hasWon && !state.won) {
    state.won = true;
    state.transcript.push("Congratulations! You've reached $1 million and achieved financial freedom!");
  }

  if (state.isBankrupt) {
    state.alive = false;
    state.transcript.push("You have gone bankrupt and can no longer continue.");
    // Optionally clear job, stop income, etc.
  }
}

function getGradMessage() {
  switch (state.education.level) {
    case "Vocational":
      return "Congratulations! You've completed your trade school education and are now ready to enter the workforce!";
    case "Undergrad":
      return "Congratulations! You've graduated from university with your bachelor's degree!";
    case "Grad":
      if (state.education.field === "Medicine") {
        return "Congratulations! You've completed medical school and are now a licensed doctor!";
      } else if (state.education.field === "Law") {
        return "Congratulations! You've completed law school and are now a licensed lawyer!";
      } else {
        return "Congratulations! You've completed graduate school and earned your advanced degree!";
      }
    default:
      return "Congratulations on completing your education!";
  }
}

export function canPurchase(cost: number) {
  return state.money >= 0.7 * cost;
}

function updateIncome() {
  if (!state.job) return;

  const baseSalary = state.job.salary;
  state.income = Math.floor(baseSalary);
  state.money += state.income;
}

export function startGame() {
  state.opened = false;
  state.transcript.push(
    `Welcome to Balancing Act, ${state.name}! Your economic journey begins now.`
  );
}
