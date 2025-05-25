import { FinancialProduct } from "./financialProduct";

export interface MortgageProps {
  id: string;
  name: string;
  balance: number;       // current mortgage balance
  interestRate: number;  // annual interest rate
  termMonths: number;    // mortgage duration in months (e.g., 360 for 30 years)
  monthlyPayment: number;
  downPayment: number;   // initial down payment amount
}

export class Mortgage extends FinancialProduct {
  termMonths: number;
  monthlyPayment: number;
  downPayment: number;
  monthsElapsed: number = 0;

  constructor(props: MortgageProps) {
    const { id, name, balance, interestRate, termMonths, monthlyPayment, downPayment } = props;
    super(id, name, balance, interestRate);

    this.termMonths = termMonths;
    this.monthlyPayment = monthlyPayment;
    this.downPayment = downPayment;
  }

  nextTurn() {
    if (!this.active) return;

    this.monthsElapsed++;

    // Calculate monthly interest
    const monthlyInterest = this.balance * (this.interestRate / 12);
    this.balance += monthlyInterest;

    // Make monthly payment
    this.balance -= this.monthlyPayment;

    if (this.balance <= 0 || this.monthsElapsed >= this.termMonths) {
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
