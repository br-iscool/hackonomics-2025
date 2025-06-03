import { InsuranceData } from "@/game/types/finance";

export class Insurance {
  data: InsuranceData;

  constructor(props: InsuranceData) {
    this.data = props;
  }

  nextTurn() {
    if (!this.data.active) return;

    this.data.yearsElapsed++;

    // Premium payment could be deducted from player’s cash in game logic
    // Here, we just track term expiration if applicable
    if (this.data.termYears && this.data.yearsElapsed >= this.data.termYears) {
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
