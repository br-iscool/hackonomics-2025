import { CreditCardData } from "@/game/state/types/finance";
import { useGameStore } from "@/game/state";

export class CreditCard {
  constructor(props: CreditCardData) {
    this.data = useGameStore.getState().finance.products.creditCards.find(card => card.id === props.id) || props;
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
