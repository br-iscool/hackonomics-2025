import { FinancialProduct } from "./financialProduct";

export interface SavingsAccountProps {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
}

export class SavingsAccount extends FinancialProduct {
  constructor(props: SavingsAccountProps) {
    const { id, name, balance, interestRate } = props;
    super(id, name, balance, interestRate);
  }

  nextTurn() {
    if (!this.active) return;

    const monthlyInterest = this.balance * (this.interestRate / 12);
    this.balance += monthlyInterest;
  }

  deposit(amount: number) {
    if (amount <= 0) return;
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (amount <= 0 || amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }
}
