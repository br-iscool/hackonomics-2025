export interface GameState {
  playerName: string;
  age: number;

  job?: unknown; //Job;
  education?: unknown; //Education;
  family: unknown; //FamilyStatus;
  events: string[]; //GameEvent[];

  stress: number;
  money: number;
  happiness: number;

  products: {
    creditCard?: unknown; // CreditCard
    loans: unknown; // Loan[]
    savings: unknown; // SavingsAcc
    mortgage?: unknown; // Mortgage
    insurance?: unknown; // Insurance
    investments?: unknown; // Investment[]
  };

  summary: {
    income: number;
    expenses: number;
    budget: number;
    debt: number;
    netWorth: number;

    creditScore: number;
    paymentHistory: number;
    totalPayments: number;
    onTimePayments: number;
    yearsCredit: number;
  };

  settings: {
    autosave: boolean;
  };
}

export interface GameEvent {
  name: string;
  condition?: () => boolean;
  type: "scheduled" | "random";
  triggerAge?: number; // for scheduled
  weight?: number; // for random
  execute: () => void;
}
