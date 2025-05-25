import { StateCreator } from 'zustand';
import { GameState } from '../types';

export interface StatsSlice {
  stats: GameState['stats'];
  increaseStress: (amount: number) => void;
  earnMoney: (amount: number) => void;
}

export const initialStats: StatsSlice['stats'] = {
  stress: 0,
  money: 0,
  age: 16,
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