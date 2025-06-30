import { state } from "@/game/logic/game-state";
import { IEvent } from "@/game/types/game-types";

export function GradEvent(): IEvent {
    return {
        name: "Graduation",
        body: () => (
            <>
                Congratulations! You have graduated {state.education.level}.
                Please check the <b>jobs</b> tab to view new jobs.
            </>
        ),
        eventData: {},
        choices: [
            {
                label: "Find new job",
                execute: () => {
                }
            }
        ]
    }
}
