import { LoanData } from "@/game/types/finance";
import { useGameStore } from "@/game/state";



export class Loan {
  public data: LoanData;

  constructor(props: LoanData) {
    useGameStore.getState().finance.addLoan(props);
    this.data = useGameStore.getState().finance.products.loans[0] || props; // TODO
  }

  nextTurn() {
    if (!this.data.active) return;

    this.data.yearsElapsed++;

    // Calculate interest for the month
    const interest = this.data.balance * (this.data.interestRate / 12);
    this.data.balance += interest;

    const success = this.makePayment();
    if (!success) {
      // modifyCreditScore(-20);
      // if (ownsProperty()) {
      //   repossessProperty();
      // }
    }

    if (this.data.balance <= 0 || this.data.yearsElapsed >= this.data.termYears) {
      this.data.balance = 0;
      this.data.active = false; // loan paid off or term ended
    }

    // modifyStats({ stress: 5 });
  }

  makePayment(): boolean {
    const canAfford = true; // query player.money or pass function
    if (!canAfford) return false;

    this.data.balance -= this.data.annualPayment;
    return true;
  }

  transact(amount: number) {
    // Allow additional payment towards loan
    this.data.balance -= amount;
    if (this.data.balance < 0) this.data.balance = 0;
  }
}
