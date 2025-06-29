import { TextEvent } from "@/game/logic/events/eventsClasses";

export function GradEvent() {
    return new TextEvent(
        "Cured",
        (eventData: any) => (
            <>
                You have been cured of {eventData.disease}!
            </>
        )
    );
}
