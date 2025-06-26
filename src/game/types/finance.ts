export interface Job {
  name : string;
  salary : number;
  yearsEmployed : number;
}

export interface Education {
  level : "Highschool" | "Vocational" | "Undergrad" | "Grad";
  field : string | null;
}

export interface CreditCardData {
  active: boolean;
  name: string;
  balance: number;
  interestRate: number;
  creditLimit: number;
  interestFreePeriod: number;
}

export interface LoanData {
  active: boolean;
  id: string;
  name: string;
  principal: number; // original amt loaned
  balance : number; // current loan amount
  interestRate: number; // annual interest rate
  termYears: number; // loan duration
  yearsElapsed: number;
}

export interface SavingsAccData {
  active: boolean;
  name: string;
  balance: number;
  interestRate: number | [number, number];
}

export interface MortgageData {
  id: string;
  name: string;
  balance: number; // current mortgage balance
  interestRate: number; // annual interest rate
  termYears: number; // mortgage duration in years
  annualPayment: number;
  downPayment: number; // initial down payment amount
  yearsElapsed: number; // years since mortgage started
  active: boolean; // whether the mortgage is still active
}

export interface InsuranceData {
  active: boolean;
  id: string;
  name: string;
  coverageAmount: number; // Amount paid out on claim
  premium: number; // Annual premium payment
  yearsElapsed: number; // Years since policy started
  termYears?: number; // Optional fixed term length
}