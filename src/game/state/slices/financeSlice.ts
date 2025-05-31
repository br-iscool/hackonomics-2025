import { StateCreator } from "zustand";
import { Finance } from "../types/finance";

export interface FinanceSlice {
  finance: Finance;
  updateDebt: (amount: number) => void;
  addLoan: (loan: unknown /* Loan */) => void;
  addCreditCard: (card: unknown /* CreditCard */) => void;
  // etc, etc
}

export const initialFinance: Finance = {
  products: {
    creditCard: undefined,
    loans: [],
    savings: { balance: 0, interestRate: 0 },
    mortgage: undefined,
    insurance: undefined,
    investments: [],
  },
  summary: {
    income: 0,
    expenses: 0,
    budget: 0,
    creditScore: 0,
    debt: 0,
    netWorth: 0,
  },

  context: {
    hasJob: false,
    isMarried: false,
    educationLevel: "none",
    householdIncome: 0,
    propertyOwned: false,
    age: 0,
  },
};

export const createFinanceSlice: StateCreator<FinanceSlice, [], [], FinanceSlice> = (set) => ({
  finance: initialFinance,
  updateDebt: (amount) =>
    set((state) => ({
      finance: {
        ...state.finance,
        summary: {
          ...state.finance.summary,
          debt: state.finance.summary.debt + amount,
        },
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
