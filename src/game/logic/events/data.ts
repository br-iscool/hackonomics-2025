import { state } from "@/game/state";
import { GameEvent } from "@/game/types";

export const gameEvents: GameEvent[] = [
  {
    name: "Tax Audit",
    type: "scheduled",
    triggerAge: 30,
    execute: () => {
      console.log("Tax audit occurred!");
    },
  },
  {
    name: "Surprise Bonus",
    type: "random",
    weight: 0.1,
    execute: () => {
      console.log("You received a surprise bonus!");
    },
  },
  {
    name: "Stress Breakdown",
    type: "random",
    weight: 0.05,
    condition: () => true, //getPlayerStress() > 80,
    execute: () => {
      console.log("You had a stress breakdown!");
    },
  },
  {
    name: "Job Opportunity",
    type: "random",
    weight: 3,
    choices: [
      {
        label: "Take job as Engineer",
        effect: () => {
          state.job = "Engineer";
          state.events.push("Started working as an Engineer.");
        },
      },
      {
        label: "Take job as Teacher",
        effect: () => {
          state.job = "Teacher";
          state.events.push("Started working as a Teacher.");
        },
      },
      {
        label: "Reject all offers",
        effect: () => {
          state.events.push("Skipped job opportunity.");
        },
      },
    ],
  },
];
