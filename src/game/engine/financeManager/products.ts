import { state } from "@/game/state";
import { MortgageData, LoanData, CreditCardData } from "@/game/types";

export class Mortgage {
  data: MortgageData;

  constructor(data: MortgageData) {
    this.data = data;
  }

  tick() {
    if (!this.data.active) return;
    const annual = this.data.annualPayment;
    if (state.money >= annual) {
      state.money -= annual;
      this.data.balance -= annual;
      this.data.yearsElapsed += 1;
      if (this.data.yearsElapsed >= this.data.termYears || this.data.balance <= 0) {
        this.data.active = false;
      }
    }
  }
}

export class Loan {
  data: LoanData;

  constructor(data: LoanData) {
    this.data = data;
  }

  tick() {
    if (!this.data.active) return;
    const annualPayment = this.data.balance * this.data.interestRate;
    if (state.money >= annualPayment) {
      state.money -= annualPayment;
      this.data.balance -= annualPayment;
      this.data.yearsElapsed += 1;
      if (this.data.yearsElapsed >= this.data.termYears || this.data.balance <= 0) {
        this.data.active = false;
      }
    }
  }
}

export class CreditCard {
  data: CreditCardData;

  constructor(data: CreditCardData) {
    this.data = data;
  }

  tick() {
    if (!this.data.active) return;
    if (this.data.interestFreePeriod > 0) {
      this.data.interestFreePeriod -= 1;
      return;
    }
    const interest = this.data.balance * (this.data.interestRate / 12);
    this.data.balance += interest;
    const minPayment = Math.min(this.data.balance, this.data.balance * 0.05);
    if (state.money >= minPayment) {
      state.money -= minPayment;
      this.data.balance -= minPayment;
    }
  }
}