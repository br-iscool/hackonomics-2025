import { Stats } from "./stats";
import { Finance } from "./finance";
import { Life } from "./life";

export interface GameState {
  playerName: string;
  age: number;

  stats: Stats;
  finance: Finance;
  life: Life;

  settings: {
    autosave: boolean;
  };
}

export interface GameEvent {
  name: string;
  condition?: () => boolean;
  type: "scheduled" | "random";
  triggerAge?: number; // for scheduled
  weight?: number; // for random
  execute: () => void;
}
