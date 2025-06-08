import { LoanData } from "@/game/types/finance";

export class Loan {
  public data: LoanData;
  annualPayment : number;

  constructor(props: LoanData) {
    this.data = props;
    const r = this.data.interestRate, n = this.data.termYears;
    this.annualPayment = this.data.principal * (r * (1 + r) ** n) / ((1 + r) ** n - 1);
  }

  nextTurn() {
    if (!this.data.active) return;

    this.data.yearsElapsed++;

    // Calculate interest for the year
    const interest = this.data.balance * this.data.interestRate;
    this.data.balance += interest;
    this.data.balance -= this.annualPayment;

    if (this.data.balance <= 0 || this.data.yearsElapsed >= this.data.termYears) {
      this.data.balance = 0;
      this.data.active = false; // loan paid off or term ended
    }

    // modifyStats({ stress: 5 });
  }
}
