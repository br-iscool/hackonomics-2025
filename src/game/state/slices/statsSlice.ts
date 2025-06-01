import { StateCreator } from 'zustand';
import { Stats } from '../../types/stats';

export interface StatsSlice {
  stats: Stats;
  increaseStress: (amount: number) => void;
  earnMoney: (amount: number) => void;
}

export const initialStats: Stats = {
  stress: 0,
  money: 0,
  happiness: 100,
};

export const createStatsSlice: StateCreator<
  StatsSlice,
  [],
  [],
  StatsSlice
> = (set) => ({
  stats: initialStats,
  increaseStress: (amount) =>
    set((state) => ({
      stats: {
        ...state.stats,
        stress: state.stats.stress + amount,
      },
    })),
  earnMoney: (amount) =>
    set((state) => ({
      stats: {
        ...state.stats,
        money: state.stats.money + amount,
      },
    })),
});