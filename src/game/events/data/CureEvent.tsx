import { TextEvent } from "@/game/types/event-types";

export function CureEvent() {
    return TextEvent(
        "Cured",
        (eventData: any) => (
            <>
                You have been cured of {eventData.disease}!
            </>
        ),
    )
}
