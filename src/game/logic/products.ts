import { state } from "@/game/state";
import { MortgageData, LoanData, SavingsAccData } from "@/game/types";

export function tickMortgage(data: MortgageData) {
  if (!data.active) return;

  const annual = data.annualPayment;

  if (state.money >= annual) {
    state.money -= annual;
    data.balance -= annual;
    data.yearsElapsed += 1;

    if (data.yearsElapsed >= data.termYears || data.balance <= 0) {
      data.active = false;
    }
  }
}

export function tickLoan(data: LoanData) {
  if (!data.active) return;

  const annualPayment = data.balance * data.interestRate;

  if (state.money >= annualPayment) {
    state.money -= annualPayment;
    data.balance -= annualPayment;
    data.yearsElapsed += 1;

    if (data.yearsElapsed >= data.termYears || data.balance <= 0) {
      data.active = false;
    }
  }
}

export function tickSavings(data: SavingsAccData) {
  if (!data.active) return;

  const interest = state.money * data.interestRate;
  state.money += interest;
  data.yearsElapsed = (data.yearsElapsed ?? 0) + 1;
}
