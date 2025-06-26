import { GameEvent } from "@/game/logic/events/eventsClasses";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EventProps {
    event: GameEvent;
}

export default function Event({ event }: EventProps) {
    console.trace("Rendering Event component with event:", event);
    return (
        <Dialog open>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{event.name}</DialogTitle>
                    <DialogDescription contentEditable='true' dangerouslySetInnerHTML={{ __html: event.getFormattedBody() }} />
                </DialogHeader>

                <DialogFooter className="flex justify-center gap-4 pt-4">
                    <Button variant="default">Accept</Button>
                    <Button variant="secondary">Decline</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
