import { LoanData } from "@/game/state/types/finance";
import { useGameStore } from "@/game/state";

export class Loan {
  public data: LoanData;

  constructor(props: LoanData) {
    useGameStore.getState().finance.addLoan(props);
    this.data = useGameStore.getState().finance.products.loans[0] || props; // TODO
  }

  nextTurn() {
    if (!this.data.active) return;

    this.data.monthsElapsed++;

    // Calculate interest for the month
    const interest = this.data.balance * (this.data.interestRate / 12);
    this.data.balance += interest;

    const success = this.data.makePayment();
    if (!success) {
      this.data.gameRef.modifyCreditScore(-20);
      if (this.data.gameRef.ownsProperty()) {
        this.data.gameRef.repossessProperty();
      }
    }

    if (this.data.balance <= 0 || this.data.monthsElapsed >= this.data.termMonths) {
      this.data.balance = 0;
      this.data.active = false; // loan paid off or term ended
    }

    this.data.gameRef.modifyStats({ stress: 5 });
  }

  makePayment(): boolean {
    const canAfford = true; // query player.money or pass function
    if (!canAfford) return false;

    this.data.balance -= this.data.monthlyPayment;
    return true;
  }

  transact(amount: number) {
    // Allow additional payment towards loan
    this.data.balance -= amount;
    if (this.data.balance < 0) this.data.balance = 0;
  }
}
