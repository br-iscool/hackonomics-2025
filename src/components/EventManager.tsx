import { useEffect } from "react";
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

	return (
		<EventDialog
			key={current.name}
			event={current}
			onClose={() => { state.events.shift(); }}
		/>
	);
}
