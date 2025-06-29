import { TextEvent } from "@/game/logic/events/generated";

export function CureEvent() {
    return TextEvent(
export function CureEvent() {
    return new TextEvent(
        "Cured",
        (eventData: any) => (
            <>
                You have been cured of {eventData.disease}!
            </>
        ),
    )
}
