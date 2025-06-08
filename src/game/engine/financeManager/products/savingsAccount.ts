//TODO: Implement high-yields savings account

import { SavingsAccData } from "@/game/types/finance";

export class SavingsAccount {
  public data: SavingsAccData;

  constructor(props : SavingsAccData) {
    this.data = props;
  }

  nextTurn() {
    if (!this.data.active) return;

    let interest = this.data.interestRate;
    if (Array.isArray(interest)) {
      const [min, max] = interest;
      interest = min + Math.random() * (max - min);
    }

    this.data.balance *= interest;
  }

  deposit(amount: number) {
    if (amount <= 0) return;
    this.data.balance += amount;
  }

  withdraw(amount: number) : boolean {
    if (amount <= 0 || amount > this.data.balance) return false;
    this.data.balance -= amount;
    return true;
  }
}
