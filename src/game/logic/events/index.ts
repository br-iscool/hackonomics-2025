import { gameEvents } from "./data";
import { GameEvent, ScheduledEvent, RandomEvent } from "./eventsClasses";
import { pickWeighted, Queue } from "@/utils";

let triggeredEvents = new Set<string>();

function isScheduledEvent(event: GameEvent): event is ScheduledEvent {
  return event instanceof ScheduledEvent;
}

function isRandomEvent(event: GameEvent): event is RandomEvent {
  return event instanceof RandomEvent;
}

export function handleEvents(currentAge: number) {
  let eventsQueue = new Queue<GameEvent>();

  // Scheduled Events
  for (const event of gameEvents) {
    if (
      isScheduledEvent(event) &&
      event.triggerAge === currentAge &&
      !triggeredEvents.has(event.name)
    ) {
      eventsQueue.enqueue(event);
      triggeredEvents.add(event.name);
    }
  }

  if (eventsQueue.empty()) {
    // Random Events
    const eligibleRandomEvents = gameEvents.filter(
      (event): event is RandomEvent =>
        isRandomEvent(event) &&
        (event.condition ? event.condition() : true) &&
        !triggeredEvents.has(event.name) && // Optional: prevent repeats
        (typeof event.weight === "function" ? event.weight() : event.weight) > 0
    );

    const picked = pickWeighted(eligibleRandomEvents);
    if (picked) {
      picked.execute();
      triggeredEvents.add(picked.name);
    }
  }

  // Execute functions
  while(!eventsQueue.empty()) {
    eventsQueue.dequeue()?.execute();
  }
}
