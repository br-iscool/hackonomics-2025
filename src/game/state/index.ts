import { create } from 'zustand';
import { createStatsSlice, StatsSlice } from './slices/statsSlice';
import { createFinanceSlice, FinanceSlice } from './slices/financeSlice';

export const useGameStore = create<StatsSlice & FinanceSlice>()((...a) => ({
  ...createStatsSlice(...a),
  ...createFinanceSlice(...a),
}));
