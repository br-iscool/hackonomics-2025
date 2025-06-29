import { proxy } from "valtio";
import { GameEvent } from "./logic/events/eventsClasses";
import { Education, Job, Housing, FamilyStatus, SavingsAccData, CreditCardData, LoanData, MortgageData, InsuranceData, CarData } from "./types";

export const state = proxy({
  alive: true,
  name: "Player",
  age: 16,
  opened: true,

  job: null as Job | null,
  education: {inSchooling : true, level : "Highschool"} as Education,
  car: null as CarData | null,
  housing : {type : "Parents"} as Housing,
  family: {status: "Single"} as FamilyStatus,
  transcript: [] as string[],
  event: null as GameEvent | null,

  stress: 0,
  money: 5000,
  qualityOfLife: 0,

  products: {
    creditCard: null as CreditCardData | null , // CreditCard
    loans: [] as LoanData[], // Loan[]
    savings: null as SavingsAccData | null,
    mortgage: null as MortgageData | null, // Mortgage
    insurance: null as InsuranceData | null, // Insurance
    investments: [] as any[], // Investment[]
  },

  income: 0,
  expenses: 0,
  budget: 0,
  debt: 0,

  creditScore: 0,
  paymentHistory: 0,
  totalPayments: 0,
  onTimePayments: 0,
  yearsCredit: 0,

  settings: {
    autosave: true,
  },
});
