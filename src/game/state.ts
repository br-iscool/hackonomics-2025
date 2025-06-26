import { proxy } from 'valtio';

export const state = proxy({
  name: '',
  age: 0,

  job: undefined as any,         // Replace with actual Job type/interface
  education: undefined as any,   // Replace with actual Education type
  family: {} as any,             // Replace with FamilyStatus
  events: [] as string[],        // Replace string[] with GameEvent[] if needed
  event: undefined as any, // Replace with GameEvent type if needed

  stress: 0,
  money: 0,
  happiness: 0,

  products: {
    creditCard: undefined as any,     // CreditCard
    loans: [] as any[],              // Loan[]
    savings: {} as any,             // SavingsAcc
    mortgage: undefined as any,     // Mortgage
    insurance: undefined as any,    // Insurance
    investments: [] as any[],       // Investment[]
  },

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

  context: {
    householdIncome: 0,
    householdExpenses: 0,
  },

  settings: {
    autosave: true,
  }
});
