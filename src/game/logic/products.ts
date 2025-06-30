import { state } from "@/game/logic/game-state";
import { LoanData, SavingsAccData, DiseaseData } from "@/game/types/game-types";
import { weightedBoolean } from "@/lib/utils";

export function tickLoan(data: LoanData) {
  if (!data.active) return;

  // Accrue interest first
  data.balance = Math.round((data.balance + data.balance * data.interestRate) * 100) / 100;

  // Calculate annual payment (principal + interest over remaining term)
  const remainingYears = data.termYears - data.yearsElapsed;
  const annualPayment = remainingYears > 0 ? data.balance / remainingYears : data.balance;

  state.totalPayments++;

  if (state.money >= annualPayment) {
    state.money -= annualPayment;
    data.balance -= annualPayment;
    data.yearsElapsed += 1;
    state.onTimePayments++;

    if (data.balance <= 0) {
      data.active = false;
      data.balance = 0;
      state.transcript.push(`You have successfully paid off your loan from ${data.name}. Your payment history has improved.`);
    } else if (data.yearsElapsed >= data.termYears) {
      data.active = false;
      state.transcript.push(`Your loan term for the loan from ${data.name} has concluded.`);
    }
  } else {
    // Default on the loan
    data.active = false;
    state.money -= data.balance; // Subtract all remaining money
    state.transcript.push(`You have defaulted on your loan from ${data.name}. Your assets have been seized, and your credit is ruined.`);
  }
}

export function tickSavings(data: SavingsAccData) {
  if (!data.active) return;

  const interest = Math.round(state.money * data.interestRate * 100) / 100;
  state.money = Math.round((state.money + interest) * 100) / 100;
  data.yearsElapsed = (data.yearsElapsed ?? 0) + 1;
}

export function tickDisease(data: DiseaseData): boolean | undefined {
  if (!data.active) return;

  if (weightedBoolean(data.curability, 1 - data.curability)) {
    data.active = false;
    return true; //is cured
  }

  state.stress += data.damage;
}
