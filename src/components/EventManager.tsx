import { useSnapshot } from "valtio";
import { state } from "@/game/state";
import { TextEvent } from "@/game/logic/events/eventsClasses";

import EventDialog from "./dialogs/EventDialog";

export default function EventManager() {
	const snap = useSnapshot(state);
	const current = snap.events[0];
	console.log("Current Event:", current);

	// nothing to show if dead or no events
	if (!snap.alive || !current) return null;

	// build the DialogEntry from the GameEvent
	const dialog = {
		title: current.name,
		body: current.getFormattedBody(),
		buttons:
			current.choices?.map((choice) => {
				const disabled = choice.condition
					? !choice.condition(current.eventData)
					: false;

				return {
					label: choice.label,
					disabled,
					onClick: () => {
						if (disabled) return;
						// first, run the event logic
						const result = choice.execute?.(current.eventData);

						state.events.shift();

						if (typeof result === "string") state.events.unshift(new TextEvent(result));
						else if (result) state.events.unshift(result);
					},
				};
			}) || [],
	};

	return (
		<EventDialog
			key={dialog.title}
			dialog={dialog}
			onClose={() => {
				state.events.shift();
			}}
		/>
	);
}
