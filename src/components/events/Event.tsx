import { GameEvent } from "@/game/logic/events/eventsClasses";
import { useState } from "react";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface EventProps {
    event: GameEvent;
}

export default function Event({ event }: EventProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [secondPopupOpen, setSecondPopupOpen] = useState(false);
    const [secondPopupContent, setSecondPopupContent] = useState<string | null>(null);

    const handleChoiceClick = (choice: any) => {
        setIsOpen(false);
        if (!choice.execute) return;

        const res = choice.execute(event.eventData);
        if (res) {
            setSecondPopupContent(res); // assuming res is string or HTML content
            setSecondPopupOpen(true);
        }
    };

    return (
        <>
            {/* First popup */}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="max-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{event.name}</AlertDialogTitle>
                        <AlertDialogDescription
                            dangerouslySetInnerHTML={{ __html: event.getFormattedBody() }}
                        />
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex justify-center gap-4 pt-4">
                        {event.choices?.map((choice, index) => (
                            <AlertDialogAction asChild key={index}>
                                <Button onClick={() => handleChoiceClick(choice)}>
                                    {choice.label}
                                </Button>
                            </AlertDialogAction>
                        ))}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={secondPopupOpen} onOpenChange={setSecondPopupOpen}>
                <AlertDialogContent className="max-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Result</AlertDialogTitle>
                        <AlertDialogDescription
                            dangerouslySetInnerHTML={{ __html: secondPopupContent || "" }}
                        />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setSecondPopupOpen(false)}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
