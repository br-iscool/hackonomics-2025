import { useEffect, isValidElement } from "react";
import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import EventDialog from "./dialogs/EventDialog";
import { GameEvent } from "@/game/logic/events/eventsClasses";


export default function EventManager() {
	const snap = useSnapshot(state);
	const current = snap.events[0];

	useEffect(() => {
		if (current && current instanceof GameEvent && typeof current.execute === "function") current.execute()
	}, [current]);

	if (!state.alive || !current) return null;

	// build the DialogEntry from the GameEvent
	const dialog = {
		title: current.name,
		body: current.body(current.eventData),
		buttons: (current.choices?.map((choice) => {
			const disabled = choice.condition
				? !choice.condition(current.eventData)
				: false;

			return {
				label: choice.label,
				disabled,
				onClick: () => {
					if (disabled) return;

					const outcome = choice.execute?.(current.eventData);

					state.events.shift();

					if (isValidElement(outcome)) {
						state.events.unshift(
							new TextEvent("Result", () => outcome)
						);
					}
				},
			};
		}) ?? []),
	};

	return (
		<EventDialog
			key={current.name}
			event={current}
			onClose={() => { state.events.shift(); }}
		/>
	);
}
