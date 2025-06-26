export interface GameChoice {
  label: string,
  condition?: () => boolean,
  effect: () => void,
}

export interface GameEvent {
  name: string;
  condition?: () => boolean;
  type: "scheduled" | "random";
  triggerAge?: number; // for scheduled
  weight?: number; // for random
  execute?: () => void;
  choices?: GameChoice[];
}
