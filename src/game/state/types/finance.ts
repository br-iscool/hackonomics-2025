export interface CreditCardData {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  creditLimit: number;
  interestFreePeriod: number;
}

export interface Finance {
  products: {
    creditCard: unknown; // CreditCard
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