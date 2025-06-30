import { state } from "@/game/logic/game-state";
import { useSnapshot } from "valtio";
import { gameLoop } from "@/game/logic/game-loop";
import { FaArrowUp } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export default function AgeUp() {
	const snap = useSnapshot(state);

	return (
		<div className="flex flex-col items-center space-y-4">
			<Button onClick={gameLoop} variant="default" className="flex items-center space-x-2 w-40 h-16 text-lg rounded-full" disabled={!snap.alive}>
				<FaArrowUp className="size-6" />
				<span>Age Up</span>
			</Button>
		</div>
	);
}
