export interface Stats {
  stress: number;
  money: number;
  happiness: number;
}

export interface Finance {
  products: {
    creditCards: unknown[]; // CreditCard[]
    loans: unknown[]; // Loan[]
    savings: unknown; // SavingsAccount
    mortgage?: unknown; // Mortgage
    insurance?: unknown; // InsurancePolicy
    investments?: unknown[]; // Investment[]
  };

  summary: {
    income: number;
    expenses: number;
    budget: number;
    creditScore: number;
    debt: number;
    netWorth: number;
  };

  // Hooks into external life context that influence finance
  context: {
    hasJob: boolean;
    isMarried: boolean;
    educationLevel: "none" | "highschool" | "university" | "grad";
    householdIncome: number;
    propertyOwned: boolean;
    age: number;
  };
}
export interface Life {
  job?: unknown; //Job;
  education?: unknown; //Education;
  family: unknown; //FamilyStatus;
  events: unknown; //GameEvent[];
}

export interface GameState {
  playerName: string;
  age: number;

  stats: Stats;
  finance: Finance;
  life: Life;

  settings: {
    autosave: boolean;
  };
}
