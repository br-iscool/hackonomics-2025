import { StateCreator } from "zustand";
import { Finance, CreditCardData, LoanData, InsuranceData, MortgageData } from "../../types/finance";

export interface FinanceSlice {
  finance: Finance & {
    updateDebt: (amount: number) => void;
    addLoan: (loan: LoanData) => void;
    addCreditCard: (card: CreditCardData) => void;
    addInsurance: (insurance: InsuranceData) => void;
    addMortgage: (mortgage: MortgageData) => void;
  };
}

export const initialFinance: Finance = {
  products: {
    loans: [],
    savings: { active: true, name: "basic", balance: 0, interestRate: 0 },
    investments: [],
  },
  summary: {
    income: 0,
    expenses: 0,
    budget: 0,
    debt: 0,
    netWorth: 0,
    
    creditScore: 0,
    paymentHistory: 0,
    totalPayments: 0,
    onTimePayments: 0,
    yearsCredit: 0,
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
  finance: {
    ...initialFinance,
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
          loans: [...state.finance.products.loans, loan],
        },
      })),
    addCreditCard: (card) =>
      set((state) => ({
        finance: {
          ...state.finance,
          products: {
            ...state.finance.products,
            creditCard: card,
          },
        },
      })),
    addInsurance: (insurance) =>
      set((state) => ({
        finance: {
          ...state.finance,
          products: {
            ...state.finance.products,
            insurance,
          },
        },
      })),
    addMortgage: (mortgage) =>
      set((state) => ({
        finance: {
          ...state.finance,
          products: {
            ...state.finance.products,
            mortgage,
          },
        },
      })),
  },
});
