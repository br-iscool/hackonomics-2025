import { proxy } from "valtio";
import {
  Education,
  Job,
  Housing,
  FamilyStatus,
  SavingsAccData,
  LoanData, 
  CarData,
  DiseaseData,
  IEvent
} from "../types/game-types";
import { randomInterval } from "@/lib/utils";

export const initialState = {
  alive: true,
  won: false,
  name: "Player",
  age: 16,
  opened: true,

  job: null as Job | null,
  education: { inSchooling: true, level: "Highschool" } as Education,
  car: null as CarData | null,
  housing: { type: "Parents" } as Housing,
  family: { value: 0 } as FamilyStatus,
  maxChildren: randomInterval(1, 4),

  diseases: [] as DiseaseData[],

  transcript: [] as string[],
  events: [] as IEvent[],
  triggeredEvents: new Set<string>(),

  stress: 1,
  money: 5000,

  products: {
    creditCard: null as boolean | null,
    car: null as CarData | null,
    loans: [] as LoanData[],
    savings: null as SavingsAccData | null,
  },

  income: 0,

  expenses: {
    education: 0,
    housing: 0,
    transportation: 0,
  } as Record<string, number>,

  paymentHistory: 0,
  totalPayments: 0,
  onTimePayments: 0,
  yearsCredit: 0,
  
};

export const state = proxy({
  ...initialState,

  get debt(): number {
    return Math.round(
      this.products.loans.reduce((acc, l) => acc + l.balance, 0) * 100
    ) / 100;
  },

  get totalExpenses(): number {
    return Math.round(
      Object.values(this.expenses).reduce((sum, val) => sum + val, 0) * 100
    ) / 100;
  },

  get creditScore(): number {
        if (!this.products.creditCard) {
            return 0;
        }
        if (this.totalPayments === 0 && this.yearsCredit === 0) {
            return 600;
        }
        const paymentHistory = this.onTimePayments / (this.totalPayments || 1);
        const creditHistory = Math.min(this.yearsCredit / 10, 1.5);
        const score = (paymentHistory * 0.7 + creditHistory * 0.3) * 550 + 300;
        return Math.max(300, Math.min(Math.round(score), 850));
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
    return !!(this.family.children?.length);
  },

  get hasWon(): boolean {
    return this.money >= 1000000;
  },
});