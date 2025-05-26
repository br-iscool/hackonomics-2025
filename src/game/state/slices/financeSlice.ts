import { StateCreator } from "zustand";

export interface Finance {
  creditCards: unknown; // CreditCard[]
  loans: unknown; // Loan[]
  savings: unknown; // SavingsAccount
  debt: number;
  mortgage?: unknown; // Mortgage
  insurance?: unknown; // InsurancePolicy
  investments?: unknown; // Investment[]
}

export interface FinanceSlice {
  finance: Finance;
  updateDebt: (amount: number) => void;
  addLoan: (loan: unknown /* Loan */) => void;
  addCreditCard: (card: unknown /* CreditCard */) => void;
  // etc, etc
}

export const initialFinance: Finance = {
  creditCards: [],
  loans: [],
  savings: { balance: 0, interestRate: 0 },
  debt: 0,
  mortgage: undefined,
  insurance: undefined,
  investments: [],
};

export const createFinanceSlice: StateCreator<FinanceSlice, [], [], FinanceSlice> = (set) => ({
  finance: initialFinance,
  updateDebt: (amount) =>
    set((state) => ({
      finance: {
        ...state.finance,
        debt: amount,
      },
    })),
  addLoan: (loan) =>
    set((state) => ({
      finance: {
        ...state.finance,
        loans: [], //[...state.finance.loans, loan],
      },
    })),
  addCreditCard: (card) =>
    set((state) => ({
      finance: {
        ...state.finance,
        creditCards: [], //[...state.finance.creditCards, card],
      },
    })),
});
