import { useState, useEffect } from "react";
import EventDialog from "./dialogs/EventDialog";
import { GameEvent } from "@/game/logic/events/eventsClasses";

interface EventManagerProps {
	event: GameEvent;
}

interface DialogEntry {
	title: string;
	body: string;
	buttons: { label: string, onClick: () => void, disabled: boolean }[];
}

export default function EventManager({ event }: EventManagerProps) {
	console.log(event, event instanceof GameEvent);
	const [dialogQueue, setDialogQueue] = useState<DialogEntry[]>([]);

	useEffect(() => {
		// Prepare first dialog entry from the initial event
		const initialEntry: DialogEntry = {
			title: event.name,
			body: event.getFormattedBody(),
			buttons:
				event.choices?.map((choice) => {
					const isDisabled = choice.condition ? !choice.condition(event.eventData) : false;

					return {
						label: choice.label,
						onClick: () => {
							if (isDisabled) return; // Prevent action if the button is disabled

							const res = choice.execute?.(event.eventData);

							closeTopDialog();

							if (res) {
								queueDialog({
									title: "Result",
									body: res,
									buttons: [{ label: "Close", onClick: closeTopDialog, disabled: false }],
								});
							}
						},
						disabled: isDisabled, // Disable button if condition is false
					};
				}) || [],
		};

		setDialogQueue([initialEntry]);
	}, [event]);

	const closeTopDialog = () => {
		setDialogQueue((prev) => prev.slice(1));
	};

	const queueDialog = (dialog: DialogEntry) => {
		setDialogQueue((prev) => [...prev, dialog]);
	};

	const currentDialog = dialogQueue[0];

	return currentDialog ? <EventDialog key={currentDialog.title} dialog={currentDialog} onClose={closeTopDialog} /> : null;
}
