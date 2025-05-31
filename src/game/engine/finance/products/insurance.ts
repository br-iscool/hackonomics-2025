import { InsuranceData } from "@/game/state/types/finance";
import { useGameStore } from "@/game/state";

export class Insurance {
  data: InsuranceData;

  constructor(props: InsuranceData) {
    useGameStore.getState().finance.addInsurance(props);
    this.data = useGameStore.getState().finance.products.insurance || props;
  }

  nextTurn() {
    if (!this.data.active) return;

    this.data.monthsElapsed++;

    // Premium payment could be deducted from player’s cash in game logic
    // Here, we just track term expiration if applicable
    if (this.data.termMonths && this.data.monthsElapsed >= this.data.termMonths) {
      this.data.active = false; // policy expired
    }
  }

  claim() {
    if (!this.data.active) return 0;

    // Pay out the coverage amount and cancel the policy
    this.data.active = false;
    return this.data.coverageAmount;
  }

  cancel() {
    this.data.active = false;
  }
}
