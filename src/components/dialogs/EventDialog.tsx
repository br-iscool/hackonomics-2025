import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/game/types";
import { handleChoice } from "@/game/logic/events";

interface EventProps {
    event: IEvent;
    onClose: () => void;
}

export default function EventDialog({ event, onClose }: EventProps) {
    return (
        <AlertDialog
            open={true}
            onOpenChange={(open: boolean) => {
                if (!open) onClose();
            }}>
            <AlertDialogContent
                className="max-w-lg"
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>{event.name}</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div>{event.body(event.eventData)}</div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center gap-4 pt-4">
                    {event.choices.map((choice, i) => {
                        const isDisabled = choice.condition ? !choice.condition(event.eventData) : false;
                        return (
                            <Button
                                key={i}
                                onClick={() => handleChoice(choice, event.eventData)}
                                disabled={isDisabled}
                                variant={isDisabled ? "outline" : "default"}
                            >
                                {choice.label}
                            </Button>
                        );
                    })}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
