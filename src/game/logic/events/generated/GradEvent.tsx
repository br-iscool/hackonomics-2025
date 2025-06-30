import { state } from "@/game/state";
import { uistate } from "@/state";
import { IEvent } from "@/game/types";

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
                    uistate.showJobSearch = true;
                }
            }
        ]
    }
}
