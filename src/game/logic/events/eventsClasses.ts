export interface GameChoice {
  label: string;
  condition?: () => boolean | null;
  execute?: ((eventData : any) => void | string) | null;
}

export type GameEventType = "scheduled" | "random";

export abstract class GameEvent {
  name: string;
  type: GameEventType;
  body: string;
  condition?: () => boolean;
  choices?: GameChoice[];
  eventData: any = {};

  constructor(
    name: string,
    type: GameEventType,
    body: string,
    condition?: () => boolean,
    choices?: GameChoice[],
    setVars?: () => void
  ) {
    this.name = name;
    this.type = type;
    this.body = body;
    this.condition = condition;
    this.choices = choices;
    if (setVars) this.eventData = setVars();
  }

  getFormattedBody(): string {
    return this.body.replace(/\{eventData\.(\w+)\}/g, (_, key) => {
      return this.eventData?.[key] ?? `[missing ${key}]`;
    });
  }
  abstract shouldTrigger(age: number): boolean;
  abstract execute(): void;
}

export class ScheduledEvent extends GameEvent {
  triggerAge: number;
  onExecute: () => void;

  constructor(
    name: string,
    triggerAge: number,
    onExecute: () => void,
    body: string,
    condition?: () => boolean,
    choices?: GameChoice[],
    setVars?: () => any
  ) {
    super(name, "scheduled", body, condition, choices, setVars);
    this.triggerAge = triggerAge;
    this.onExecute = onExecute;
  }

  shouldTrigger(age: number): boolean {
    return age === this.triggerAge && (!this.condition || this.condition());
  }

  execute() {
    if (this.choices && this.choices.length > 0) {
      // Hook into UI to choose
    } else {
      this.onExecute();
    }
  }
}

export class RandomEvent extends GameEvent {
  weight: number | (() => number);
  onExecute: null | (() => void | string);

  constructor(
    name: string,
    weight: number | (() => number),
    onExecute: null | (() => void | string),
    body: string,
    condition?: () => boolean,
    choices?: GameChoice[],
    setVars?: () => any
  ) {
    super(name, "random", body, condition, choices, setVars);
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
      if (this.onExecute) this.onExecute();
    }
  }
}
