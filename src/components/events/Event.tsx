import { GameEvent } from "@/game/logic/events/eventsClasses";
import { Button } from "../ui/button";


interface EventProps {
    event: GameEvent;
}

export default function Event({ event }: EventProps) {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg bg-gray-900/75 w-96 z-50">
            <div className="items-center justify-center text-white">
                <h1 className="text-bold text-center text-2xl pb-2">
                    { event.name }
                </h1>
                <hr className="p-2" />
                <p className="text-center text-lg pb-2">{ event.getFormattedBody() }</p>
                <hr className="p-2" />

                <div className="flex items-center justify-center">
                    <Button> <p>"Accept"</p></Button>
                    <Button> <p>"Decline"</p></Button>
                </div>
            </div>
        </div>
    );
}
