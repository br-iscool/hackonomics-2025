import { state } from "@/game/state";
import { GameChoice, GameEvent, ScheduledEvent, RandomEvent } from "./eventsClasses";

export const gameEvents: GameEvent[] = [
  new RandomEvent(
    "Part-time Job",
    () => {return 0.05}, //gets employability from state
    () => {},
    () => {return state.job == null},
    [
      {
        label : "Yes",
        effect : () => {
          //gives player a job
        }
      },
      {
        label : "No",
        effect : () => {
          return null // do nothing.
        }
      },
    ]
  )
];
