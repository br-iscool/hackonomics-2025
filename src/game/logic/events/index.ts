import { gameEvents } from "./data";
import { GameEvent, ScheduledEvent, RandomEvent } from "./eventsClasses";
import { pickWeighted, Queue } from "@/utils";
import { state } from "@/game/state";

let triggeredEvents = new Set<string>();

function isScheduledEvent(event: GameEvent): event is ScheduledEvent {
  return event instanceof ScheduledEvent;
}

function isRandomEvent(event: GameEvent): event is RandomEvent {
  return event instanceof RandomEvent;
}

export function handleEvents(currentAge: number) {
  console.log(`Handling events for age ${currentAge}`);
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

  if (eventsQueue.size() == 0) {
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
  console.log(`Random event picked:`, triggeredEvents);


  // Execute functions
  while(eventsQueue.size() > 0) {
    const event = eventsQueue.dequeue();
    if (event) {
      event.execute();
      state.event = event;
    }
  }
}
