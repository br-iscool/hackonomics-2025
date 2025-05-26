import { FinancialProduct } from "./financialProduct";

export interface InsuranceProps {
  id: string;
  name: string;
  coverageAmount: number;  // Amount paid out on claim
  premium: number;         // Monthly premium payment
  termMonths?: number;     // Optional fixed term length
}

export class Insurance extends FinancialProduct {
  coverageAmount: number;
  premium: number;
  termMonths?: number;
  monthsElapsed: number = 0;

  constructor(props: InsuranceProps) {
    const { id, name, coverageAmount, premium, termMonths } = props;
    // Insurance doesn’t have a balance lol
    super(id, name, 0, 0);

    this.coverageAmount = coverageAmount;
    this.premium = premium;
    this.termMonths = termMonths;
  }

  nextTurn() {
    if (!this.active) return;

    this.monthsElapsed++;

    // Premium payment could be deducted from player’s cash in game logic
    // Here, we just track term expiration if applicable
    if (this.termMonths && this.monthsElapsed >= this.termMonths) {
      this.active = false; // policy expired
    }
  }

  claim() {
    if (!this.active) return 0;

    // Pay out the coverage amount and cancel the policy
    this.active = false;
    return this.coverageAmount;
  }

  cancel() {
    this.active = false;
  }
}
