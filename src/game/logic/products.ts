import { state } from "@/game/state";
import { MortgageData, LoanData, CreditCardData, SavingsAccData } from "@/game/types";

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

export function tickCreditCard(data: CreditCardData) {
  if (!data.active) return;

  if (data.interestFreePeriod > 0) {
    data.interestFreePeriod -= 1;
    return;
  }

  const interest = data.balance * data.interestRate;
  data.balance += interest;

  const minPayment = Math.min(data.balance, data.balance * 0.05);

  if (state.money >= minPayment) {
    state.money -= minPayment;
    data.balance -= minPayment;
  }
}

export function tickSavings(data: SavingsAccData) {
  if (!data.active) return;

  const interest = data.balance * data.interestRate;
  data.balance += interest;
  data.yearsElapsed = (data.yearsElapsed ?? 0) + 1;
}

export function depositToSavings(data: SavingsAccData, amount: number) {
  if (state.money >= amount) {
    state.money -= amount;
    data.balance += amount;
  }
}

export function withdrawFromSavings(data: SavingsAccData, amount: number) {
  if (data.balance >= amount) {
    data.balance -= amount;
    state.money += amount;
  }
}
