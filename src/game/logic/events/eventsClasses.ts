export interface GameChoice {
  label: string;
  condition?: () => boolean | null;
  effect: (() => void) | null;
}

export type GameEventType = "scheduled" | "random";

export abstract class GameEvent {
  name: string;
  type: GameEventType;
  condition?: () => boolean;
  choices?: GameChoice[];

  constructor(name: string, type: GameEventType, condition?: () => boolean, choices?: GameChoice[]) {
    this.name = name;
    this.type = type;
    this.condition = condition;
    this.choices = choices;
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
    condition?: () => boolean,
    choices?: GameChoice[]
  ) {
    super(name, "scheduled", condition, choices);
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
  onExecute: () => void;

  constructor(
    name: string,
    weight: number | (() => number),
    onExecute: () => void,
    condition?: () => boolean,
    choices?: GameChoice[]
  ) {
    super(name, "random", condition, choices);
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
      this.onExecute();
    }
  }
}
