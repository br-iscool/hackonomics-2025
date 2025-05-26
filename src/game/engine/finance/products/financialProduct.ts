// Base class for all financial products
export abstract class FinancialProduct {
  id: string; 
  name: string;
  balance: number; // current balance (e.g. loan amount, savings)
  interestRate: number;
  active: boolean;

  constructor(
    id: string,
    name: string,
    balance: number,
    interestRate: number,
    active = true
  ) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.interestRate = interestRate;
    this.active = active;
  }

  // Called at end of each turn (year)
  abstract nextTurn(): void;

  // OPTIONAL: method to make a payment or deposit
  transact?(amount: number): void;
}
