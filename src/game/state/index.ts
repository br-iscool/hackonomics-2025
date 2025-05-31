import { create } from "zustand";
import { createStatsSlice, StatsSlice } from "./slices/statsSlice";
import { createFinanceSlice, FinanceSlice } from "./slices/financeSlice";
import { createLifeSlice, LifeSlice } from "./slices/lifeSlice";
import { GameState } from "./types/game";

export const useGameStore = create<StatsSlice & FinanceSlice & LifeSlice & GameState>()((...a) => ({
  playerName: "Player",
  age: 18,

  ...createStatsSlice(...a),
  ...createFinanceSlice(...a),
  ...createLifeSlice(...a),

  settings: {
    autosave: true,
  },
}));
