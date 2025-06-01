import { StateCreator } from "zustand";
import { Life } from "../../types/life";

export interface LifeSlice {
  life: Life;
}

export const initialLife: Life = {
  job: undefined, // Job
  education: undefined, // Education
  family: { status: "single", children: [] }, // FamilyStatus
  events: [], // GameEvent[]
};

export const createLifeSlice: StateCreator<LifeSlice, [], [], LifeSlice> = (set) => ({
  life: initialLife,
});
