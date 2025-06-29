import { IEvent } from "@/game/types";
import { JSX } from "react";

export function TextEvent(name: string, body: (data: any) => JSX.Element): IEvent {
  return {
    name,
    body,
    eventData: {},
    choices: [
      {
        label: "Okay",
        condition: () => true,
        execute: () => {},
      },
    ],
  };
}