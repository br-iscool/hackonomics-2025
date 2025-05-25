import { FinancialProduct } from "./financialProduct";

export interface CreditCardProps {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  creditLimit: number;
  interestFreePeriod: number;
}

export class CreditCard extends FinancialProduct {
  creditLimit: number;
  interestFreePeriod: number; // number of turns before interest applies

  constructor(props: CreditCardProps) {
    const { id, name, balance, interestRate, creditLimit, interestFreePeriod } = props;

    super(id, name, balance, interestRate);
    
    this.creditLimit = creditLimit;
    this.interestFreePeriod = interestFreePeriod;
  }

  nextTurn() {
    if (!this.active) return;

    // Apply interest if balance not paid in full before due date
    if (this.balance > 0) {
      this.balance += this.balance * this.interestRate;
    }
  }

  transact(amount: number) {
    const newBalance = this.balance + amount;
    if (newBalance > this.creditLimit) {
      throw new Error("Credit limit exceeded");
    }
    this.balance = newBalance;
  }
}
