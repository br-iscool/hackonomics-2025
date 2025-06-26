import { state } from "@/game/state";
import { GameChoice, GameEvent, ScheduledEvent, RandomEvent } from "./eventsClasses";
import { chooseRandom, randomInterval } from "@/utils";

export const gameEvents: GameEvent[] = [
  new RandomEvent(
    "Part-time Job",
    () => 0.1, //gets employability from state
    null,
    `You have been offered the position of a <b>{eventData.job}</b>
    at the local {eventData.location}
    for a starting salary of <b>{eventData.salary}</b>. Do you accept?`,
    () => state.job == null,
    [
      {
        label: "Yes",
        effect: () => {
          //gives player a job
        }
      },
      {
        label: "No",
        effect: () => {
          return null // do nothing.
        }
      },
    ],
    () => {
      const jobs = ["Cashier", "Janitor", "Security Guard"];
      const locations = ["IHoP", "MacDennys", "Sofaway"];

      return {
        job: chooseRandom(jobs),
        location: chooseRandom(locations),
        salary: randomInterval(16000, 25000),
      }
    }
  )
];
