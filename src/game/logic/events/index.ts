import { gameEvents } from "./data";
import { pickWeighted } from "@/utils";

let triggeredEvents = new Set<string>();

export function handleEvents(currentAge: number) {
  // Scheduled Events
  for (const event of gameEvents) {
    if (
      event.type === "scheduled" &&
      event.triggerAge === currentAge &&
      !triggeredEvents.has(event.name)
    ) {
      if (event.execute) event.execute();
      triggeredEvents.add(event.name);
    }
  }

  // Random Events
  const eligibleRandomEvents = gameEvents.filter(
    (event) =>
      event.type === "random" &&
      (event.condition ? event.condition() : true) &&
      !triggeredEvents.has(event.name) && // Optional: prevent repeats
      (event.weight ?? 0) > 0
  );

  const picked = pickWeighted(eligibleRandomEvents);
  if (picked) {
    if (picked.execute) picked.execute();
    triggeredEvents.add(picked.name);
  }
}
