import { FinancialProduct } from "./financialProduct";

export interface LoanProps {
  id: string;
  name: string;
  balance: number; // current loan amount
  interestRate: number; // annual interest rate
  termMonths: number; // loan duration in months
  monthlyPayment: number; // monthly payment amount
  gameRef: {
    getCreditScore: () => number;
    modifyCreditScore: (delta: number) => void;
    ownsProperty: () => boolean;
    repossessProperty: () => void;
    modifyStats: (mod: Partial<unknown> /*Partial<Stats>*/) => void;
  };
}

export class Loan extends FinancialProduct {
  termMonths: number; // loan duration
  monthlyPayment: number;
  monthsElapsed: number = 0;
  private gameRef: LoanProps["gameRef"];

  constructor(props: LoanProps) {
    const { id, name, balance, interestRate, termMonths, monthlyPayment, gameRef } = props;

    super(id, name, balance, interestRate);

    this.termMonths = termMonths;
    this.monthlyPayment = monthlyPayment;
  }

  nextTurn() {
    if (!this.active) return;

    this.monthsElapsed++;

    // Calculate interest for the month
    const interest = this.balance * (this.interestRate / 12);
    this.balance += interest;

    const success = this.makePayment();
    if (!success) {
      this.gameRef.modifyCreditScore(-20);
      if (this.gameRef.ownsProperty()) {
        this.gameRef.repossessProperty();
      }
    }

    if (this.balance <= 0 || this.monthsElapsed >= this.termMonths) {
      this.balance = 0;
      this.active = false; // loan paid off or term ended
    }

    this.gameRef.modifyStats({ stress: 5 });
  }

  makePayment(): boolean {
    const canAfford = true; // query player.money or pass function
    if (!canAfford) return false;

    this.balance -= this.monthlyPayment;
    return true;
  }

  transact(amount: number) {
    // Allow additional payment towards loan
    this.balance -= amount;
    if (this.balance < 0) this.balance = 0;
  }
}
