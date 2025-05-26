import { FinancialProduct } from "./financialProduct";

export interface DebtProps {
  id: string;
  name: string;
  balance: number; // Amount owed
  interestRate: number; // Annual interest rate (e.g., 0.20 for 20%)
  minimumPayment: number;
}

export class Debt extends FinancialProduct {
  minimumPayment: number;

  constructor(props: DebtProps) {
    const { id, name, balance, interestRate, minimumPayment } = props;
    super(id, name, balance, interestRate);
    this.minimumPayment = minimumPayment;
  }

  nextTurn() {
    if (!this.active) return;

    // Apply monthly interest
    const monthlyInterest = this.balance * (this.interestRate / 12);
    this.balance += monthlyInterest;

    // In a real game loop, this would trigger a stress event if unpaid
    // Could link to a `PlayerStats` object to increase stress if `minimumPayment` is unmet
  }

  pay(amount: number) {
    if (amount <= 0) return;
    this.balance -= amount;
    if (this.balance <= 0) {
      this.balance = 0;
      this.active = false;
    }
  }

  isOverdue(): boolean {
    return this.balance > 0;
  }
}
