import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import EventDialog from "./dialogs/EventDialog";


export default function EventManager() {
	const snap = useSnapshot(state);
	const current = snap.events[0];

	if (!state.alive || !current) return null;

	return (
		<EventDialog
			key={current.name}
			event={current}
			onClose={() => { state.events.shift(); }}
		/>
	);
}
