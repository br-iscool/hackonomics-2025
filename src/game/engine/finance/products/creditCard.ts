import { CreditCardData } from "@/game/types/finance";
import { useGameStore } from "@/game/state";

export class CreditCard {
  public data: CreditCardData;

  constructor(props: CreditCardData) {
    useGameStore.getState().finance.addCreditCard(props);
    this.data = useGameStore.getState().finance.products.creditCard || props;
  }

  nextTurn() {
    // Apply interest if balance not paid in full before due date
    if (this.data.balance > 0) {
      this.data.balance += this.data.balance * this.data.interestRate;
    }
  }

  transact(amount: number) {
    const newBalance = this.data.balance + amount;
    if (newBalance > this.data.creditLimit) {
      throw new Error("Credit limit exceeded");
    }
    this.data.balance = newBalance;
  }
}
