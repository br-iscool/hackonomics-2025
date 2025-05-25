import { FinancialProduct } from "./financialProduct";

export interface LoanProps {
  id: string;
  name: string;
  balance: number; // current loan amount
  interestRate: number; // annual interest rate
  termMonths: number; // loan duration in months
  monthlyPayment: number; // monthly payment amount
}

export class Loan extends FinancialProduct {
  termMonths: number; // loan duration
  monthlyPayment: number;
  monthsElapsed: number = 0;

  constructor(props: LoanProps) {
    const { id, name, balance, interestRate, termMonths, monthlyPayment } = props;

    super(id, name, balance, interestRate);
    
    this.termMonths = termMonths;
    this.monthlyPayment = monthlyPayment;
  }

  nextTurn() {
    if (!this.active) return;

    this.monthsElapsed++;

    // Calculate interest for the month
    const monthlyInterest = this.balance * (this.interestRate / 12);
    this.balance += monthlyInterest;

    // Make payment
    this.balance -= this.monthlyPayment;

    if (this.balance <= 0 || this.monthsElapsed >= this.termMonths) {
      this.balance = 0;
      this.active = false; // loan paid off or term ended
    }
  }

  transact(amount: number) {
    // Allow additional payment towards loan
    this.balance -= amount;
    if (this.balance < 0) this.balance = 0;
  }
}
