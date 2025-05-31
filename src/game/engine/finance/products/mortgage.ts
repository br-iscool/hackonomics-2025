import { useGameStore } from "@/game/state";
import { MortgageData } from "@/game/state/types/finance";

export class Mortgage {
  public data: MortgageData;

  constructor(props: MortgageData) {
    useGameStore.getState().finance.addMortgage(props);
    this.data = useGameStore.getState().finance.products.mortgage || props;
  }

  nextTurn() {
    if (!this.data.active) return;

    this.data.yearsElapsed++;

    // Calculate annual interest
    const annualInterest = this.data.balance * (this.data.interestRate);
    this.data.balance += annualInterest;

    // Make annual payment
    this.data.balance -= this.data.annualPayment;

    if (this.data.balance <= 0 || this.data.yearsElapsed >= this.data.termYears) {
      this.data.balance = 0;
      this.data.active = false; // mortgage paid off or term ended
    }
  }

  transact(amount: number) {
    // Extra payment towards mortgage principal
    this.data.balance -= amount;
    if (this.data.balance < 0) this.data.balance = 0;
  }
}
