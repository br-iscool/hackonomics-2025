import { FinancialProduct } from "./financialProduct";

export interface MortgageProps {
  id: string;
  name: string;
  balance: number;       // current mortgage balance
  interestRate: number;  // annual interest rate
  termYears: number;    // mortgage duration in years
  annualPayment: number;
  downPayment: number;   // initial down payment amount
}

export class Mortgage extends FinancialProduct {
  termYears: number;
  annualPayment: number;
  downPayment: number;
  yearsElapsed: number = 0;

  constructor(props: MortgageProps) {
    const { id, name, balance, interestRate, termYears, annualPayment, downPayment } = props;
    super(id, name, balance, interestRate);

    this.termYears = termYears;
    this.annualPayment = annualPayment;
    this.downPayment = downPayment;
  }

  nextTurn() {
    if (!this.active) return;

    this.yearsElapsed++;

    // Calculate annual interest
    const annualInterest = this.balance * (this.interestRate);
    this.balance += annualInterest;

    // Make annual payment
    this.balance -= this.annualPayment;

    if (this.balance <= 0 || this.yearsElapsed >= this.termYears) {
      this.balance = 0;
      this.active = false; // mortgage paid off or term ended
    }
  }

  transact(amount: number) {
    // Extra payment towards mortgage principal
    this.balance -= amount;
    if (this.balance < 0) this.balance = 0;
  }
}
