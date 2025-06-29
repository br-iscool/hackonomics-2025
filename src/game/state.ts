import { proxy } from "valtio";
import { GameEvent } from "./logic/events/eventsClasses";
import {
  Education,
  Job,
  Housing,
  FamilyStatus,
  SavingsAccData,
  LoanData,
  MortgageData,
  InsuranceData,
  CarData,
  DiseaseData
} from "./types";

export const state = proxy({
  alive: true,
  name: "Player",
  age: 16,
  opened: true,

  job: null as Job | null,
  education: { inSchooling: true, level: "Highschool" } as Education,
  car: null as CarData | null,
  housing: { type: "Parents" } as Housing,
  family: { status: "Single" } as FamilyStatus,

  diseases: [] as DiseaseData[],

  transcript: [] as string[],
  events: [] as GameEvent[],
  triggeredEvents: new Set<string>(),

  stress: 0,
  money: 5000,
  qualityOfLife: 0,

  products: {
    creditCard: null as boolean | null, // CreditCard
    loans: [] as LoanData[], // Loan[]
    savings: null as SavingsAccData | null,
    mortgage: null as MortgageData | null, // Mortgage
    insurance: null as InsuranceData | null, // Insurance
    investments: [] as any[], // Investment[]
  },

  income: 0,
  budget: 0,
  get debt(): number {
    return (
      (this.products.mortgage?.balance || 0) +
      this.products.loans.reduce((acc, l) => acc + l.balance, 0)
    );
  },

  expenses: {
    education: 0,
    housing: 0,
    transportation: 0,
    entertainment: 0,
    other: 0,
  } as Record<string, number>,
  get totalExpenses() {
    return Object.values(this.expenses).reduce((sum, val) => sum + val, 0);
  },

  paymentHistory: 0,
  totalPayments: 0,
  onTimePayments: 0,
  yearsCredit: 0,

  get creditScore(): number {
    const paymentHistory = this.onTimePayments / (this.totalPayments || 1);
    const creditHistory = Math.max(this.yearsCredit / 10, 1);
    return (paymentHistory * 0.7 + creditHistory * 0.3) * 600 + 300;
  },

  settings: {
    autosave: true,
  },

  get isBankrupt(): boolean {
    const criticallyNegativeMoney = this.money < -1000;
    const hopelessDebt = this.money < -2000 && this.debt > 10000;
    return criticallyNegativeMoney || hopelessDebt;
  },

  get isEmployed(): boolean {
    return !!this.job;
  },

  get isGraduated(): boolean {
    return !this.education.inSchooling && (this.education.yearsUntilGrad ?? 0) <= 0;
  },

  get hasChildren(): boolean {
    return !!state.family.children?.length;
  },


});
