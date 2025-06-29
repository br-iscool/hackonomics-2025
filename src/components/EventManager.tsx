import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import { TextEvent } from "@/game/logic/events/eventsClasses";

import EventDialog from "./dialogs/EventDialog";

export default function EventManager() {
	const snap = useSnapshot(state);
	const current = snap.events[0];

	useEffect(() => {
		if (current && typeof current.execute === "function") { current.execute(); console.log("Event executed:", current.name); }
	}, [current]);

	if (!state.alive || !current) return null;

	// build the DialogEntry from the GameEvent
	const dialog = {
		title: current.name,
		body: current.body(current.eventData),
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

						const result = choice.execute?.(current.eventData);

						state.events.shift();

						if (result) {
							state.events.unshift(
								new TextEvent((eventData) => result)
							);
						}
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
