import { SavingsAccData } from "@/game/types/finance";
import { useGameStore } from "@/game/state";

export class SavingsAccount {
  public data: SavingsAccData;

  constructor(props: SavingsAccData) {
    useGameStore.getState().finance.products.savings;
    this.data = useGameStore.getState().finance.products.savings || props;
  }

  nextTurn() {
    if (!this.data.active) return;

    const monthlyInterest = this.data.balance * (this.data.interestRate / 12);
    this.data.balance += monthlyInterest;
  }

  deposit(amount: number) {
    if (amount <= 0) return;
    this.data.balance += amount;
  }

  withdraw(amount: number) {
    if (amount <= 0 || amount > this.data.balance) return false;
    this.data.balance -= amount;
    return true;
  }
}
