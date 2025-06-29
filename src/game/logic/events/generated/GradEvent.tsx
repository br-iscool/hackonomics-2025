import { NormalEvent } from "@/game/logic/events/eventsClasses";
import { state } from "@/game/state";
import { uistate } from "@/state";

export function GradEvent() {
    return new NormalEvent(
        "Graduation",
        (eventData: any) => (
            <>
                Congratulations! You have graduated {state.education.level}.
                Please check the <b>jobs</b> tab to view new jobs.
            </>
        ),
        [
            {
                label: "Find new job",
                execute: (eventData) => {
                    uistate.showJobSearch = true;
                }
            }
        ]
    );
}
