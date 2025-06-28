import { proxy } from "valtio";
import { GameEvent } from "./logic/events/eventsClasses";
import { Education, Job, Housing, FamilyStatus } from "./types";

export const state = proxy({
  alive: true,
  name: "",
  age: 16,

  job: null as Job | null,
  education: {inSchooling : true, level : "Highschool"} as Education,
  housing : {type : "Parents"} as Housing,
  family: {status: "Single"} as FamilyStatus,
  transcript: [] as string[],
  event: null as GameEvent | null,

  stress: 0,
  money: 5000,
  qualityOfLife: 0,

  products: {
    creditCard: undefined as any, // CreditCard
    loans: [] as any[], // Loan[]
    savings: {} as any, // SavingsAcc
    mortgage: undefined as any, // Mortgage
    insurance: undefined as any, // Insurance
    investments: [] as any[], // Investment[]
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

  settings: {
    autosave: true,
  },
});
