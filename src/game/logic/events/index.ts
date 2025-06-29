import { state } from "@/game/state";

import { gameEvents } from "./data";
import { GameEvent, ScheduledEvent, RandomEvent } from "./eventsClasses";
import { pickWeighted } from "@/utils";

function isScheduledEvent(event: GameEvent): event is ScheduledEvent {
  return event instanceof ScheduledEvent;
}

function isRandomEvent(event: GameEvent): event is RandomEvent {
  return event instanceof RandomEvent;
}

export function handleEvents(currentAge: number) {
  // Scheduled Events
  for (const event of gameEvents) {
    if (
      isScheduledEvent(event) &&
      event.trigger === currentAge &&
      !state.triggeredEvents.has(event.name)
    ) {
      state.events.push(event);
    }
  }

  if (state.events.length === 0) {
    // Random Events
    const eligibleRandomEvents = gameEvents.filter(
      (event): event is RandomEvent =>
        isRandomEvent(event) &&
        (event.condition ? event.condition() : true) &&
        !state.triggeredEvents.has(event.name) && // Optional: prevent repeats
        (typeof event.weight === "function" ? event.weight() : event.weight) > 0
    );

    const picked = pickWeighted(eligibleRandomEvents);
    if (picked) {
      state.events.push(picked);
      if (!picked.repeatable) state.triggeredEvents.add(picked.name);
    }
  }

  console.log("Current Events:", state.events);
}
