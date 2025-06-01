import { GameEvent } from "@/game/types";

export const gameEvents: GameEvent[] = [
  {
    name: "Tax Audit",
    type: "scheduled",
    triggerAge: 30,
    execute: () => {
      console.log("Tax audit occurred!");
    }
  },
  {
    name: "Surprise Bonus",
    type: "random",
    weight: 0.1,
    execute: () => {
      console.log("You received a surprise bonus!");
    }
  },
  {
    name: "Stress Breakdown",
    type: "random",
    weight: 0.05,
    condition: () => true, //getPlayerStress() > 80,
    execute: () => {
      console.log("You had a stress breakdown!");
    }
  }
];