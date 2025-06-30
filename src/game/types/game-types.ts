import { JSX } from "react";

export interface Choice {
  label: string;
  condition?: ((eventData: any) => boolean | null) | null;
  execute?: ((eventData: any) => void | JSX.Element | IEvent) | null;
}

export interface IEvent {
  name: string;
  body: (eventData: any) => JSX.Element;
  choices: ReadonlyArray<Choice>;
  eventData: any;
}

export interface FamilyMember {
  age: number;
  relationship: "Child" | "Partner" | "Other";
  health: "Healthy" | "Sick";
  spouseStatus?: "Single" | "Relationship" | "Married";
  yearsWithPartner?: number;
}

export interface FamilyStatus {
  value?: number;
  spouse?: FamilyMember;
  children?: FamilyMember[];
}

export interface Job {
  role: string;
  salary: number;
  yearsEmployed: number;
}

export interface Education {
  inSchooling: boolean;
  level: "Highschool" | "Vocational" | "Undergrad" | "Grad";
  tuition?: number;
  field?: string;
  yearsUntilGrad?: number;
}

export interface Housing {
  type: "Parents" | "Apartment" | "House";
  rent?: number;
}

export interface LoanData {
  active: boolean;
  id: string;
  name: string;
  principal: number; // original amt loaned
  balance: number; // current loan amount
  interestRate: number; // annual interest rate
  downPayment: number; // initial down payment amount
  termYears: number; // loan duration
  yearsElapsed: number;
}

export interface SavingsAccData {
  active: boolean;
  name: string;
  interestRate: number;
  yearsElapsed?: number;
}

export interface CarData {
  type: "Cheap" | "Average" | "Luxury" | "None";
  name: string;
  value: number;
}

export interface DiseaseData {
  active: boolean;
  name: string;
  curability: number; //percent chance per turn it gets cured
  cost: number; //to recover
  damage: number; //percent incurred on health per turn
}
