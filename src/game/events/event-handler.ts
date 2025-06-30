import { state } from "@/game/logic/game-state";

import { gameEvents } from "./main";
import { ScheduledEvent, RandomEvent } from "./event-classes";
import { Choice, IEvent } from "@/game/types/game-types";
import {JSX} from "react";

import { pickWeighted } from "@/lib/utils";
import { TextEvent } from "../types/event-types";

export function handleEvents(currentAge: number) {
  // Scheduled Events
  for (const event of gameEvents) {
    if (
      event instanceof ScheduledEvent &&
      event.trigger === currentAge &&
      event.condition() &&
      !state.triggeredEvents.has(event.name)
    ) {
      state.events.push(event);
    }
  }

  if (state.events.length === 0) {
    // Random Events
    const eligibleRandomEvents = gameEvents.filter(
      (event): event is RandomEvent =>
        event instanceof RandomEvent &&
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
}

export function handleChoice(choice: Choice, data: any) {
  const result = choice.execute?.(data);
  state.events.shift(); // always remove the current

  if (result) {
    enqueueEvent(result);
  }
}

function enqueueEvent(result: JSX.Element | IEvent) {
  if (result && typeof result === 'object' && 'name' in result && 'body' in result && 'choices' in result) {
    state.events.unshift(result as IEvent);
  } else {
    state.events.unshift(TextEvent("Result", () => result as JSX.Element));
  }
}