import { IEvent } from "@/game/types";
import { JSX } from "react";

export interface GameChoice {
  label: string;
  condition?: ((eventData: any) => boolean | null) | null;
  execute?: ((eventData: any) => void | JSX.Element) | null;
}

export type GameEventType = "scheduled" | "random";

export abstract class GameEvent implements IEvent {
  name: string;
  type: GameEventType;
  body: (eventData: any) => JSX.Element;
  condition: () => boolean;
  choices: ReadonlyArray<GameChoice>;
  repeatable?: boolean;
  eventData: any = {};

  constructor(
    name: string,
    type: GameEventType,
    body: (eventData: any) => JSX.Element,
    condition: () => boolean,
    choices: ReadonlyArray<GameChoice>,
    setVars?: () => void,
    repeatable?: boolean
  ) {
    this.name = name;
    this.type = type;
    this.body = body;
    this.condition = condition;
    this.choices = choices;
    if (setVars) this.eventData = setVars();
    this.repeatable = repeatable;
  }

  abstract execute(): JSX.Element | void;
}

export class ScheduledEvent extends GameEvent {
  trigger: number | (() => boolean);
  onExecute: null | ((eventData: any) => void | JSX.Element);

  constructor(
    name: string,
    trigger: number | (() => boolean),
    onExecute: null | ((eventData: any) => void | JSX.Element),
    body: (eventData : any) => JSX.Element,
    condition: () => boolean,
    choices: GameChoice[],
    setVars?: () => any,
    repeatable?: boolean
  ) {
    super(name, "scheduled", body, condition, choices, setVars, repeatable);
    this.trigger = trigger;
    this.onExecute = onExecute;
  }

  shouldTrigger(age: number): boolean {
    if (typeof this.trigger === "number") {
      return age === this.trigger && (!this.condition || this.condition());
    } else if (typeof this.trigger === "function") {
      return this.trigger();
    }
    return false;
  }

  execute() {
    if (this.choices && this.choices.length > 0) {
      // Hook into UI to choose
    } else {
      if (this.onExecute) this.onExecute(this.eventData);
    }
  }
}

export class TextEvent extends GameEvent {
  constructor(body: (eventData : any) => JSX.Element) {
    super("Result", "scheduled", body, () => true, [
      {
        label: "Okay",
        condition: () => true,
        execute: () => {},
      },
    ] as GameChoice[]);
  }
  execute(): void {}
}

export class RandomEvent extends GameEvent {
  weight: number | (() => number);
  onExecute: null | ((eventData: any) => void | JSX.Element);

  constructor(
    name: string,
    weight: number | (() => number),
    onExecute: null | ((eventData : any) => void | JSX.Element),
    body: (eventData : any) => JSX.Element,
    condition: () => boolean,
    choices: GameChoice[],
    setVars?: () => any,
    repeatable?: boolean
  ) {
    super(name, "random", body, condition, choices, setVars, repeatable);
    this.weight = weight;
    this.onExecute = onExecute;
  }

  shouldTrigger(_age: number): boolean {
    return !this.condition || this.condition();
  }

  execute() {
    if (this.choices && this.choices.length > 0) {
      // Hook into UI to choose
    } else {
      if (this.onExecute) this.onExecute(this.eventData);
    }
  }
}

export class NormalEvent extends GameEvent {
  constructor(
    name: string,
    body: (eventData: any) => JSX.Element,
    choices: GameChoice[],
    setVars?: () => any,
  ) {
    super(name, "scheduled", body, () => true, choices, setVars, false);
  }
  shouldTrigger(_age: number): boolean { return true; }
  execute(): void { }
}