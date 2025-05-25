export interface Stats {
  stress: number;
  money: number;
  age: number;
  happiness: number;
}

export interface Finance {
  creditCards: unknown; //CreditCard[];
  loans: unknown; //Loan[];
  savings: unknown; //SavingsAccount;
  debt: number;
  mortgage?: unknown; //Mortgage;
  insurance?: unknown; //InsurancePolicy;
  investments?: unknown; //Investment[];
}

export interface Life {
  job?: unknown; //Job;
  education?: unknown; //Education;
  family: unknown; //FamilyStatus;
  events: unknown; //GameEvent[];
}

export interface GameState {
  playerName: string;
  turn: number;

  stats: Stats;
  finance: Finance;
  life: Life;

  settings: {
    difficulty: "easy" | "medium" | "hard";
    autosave: boolean;
  };
}
