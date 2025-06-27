import { state } from "@/game/state";
import { useSnapshot } from "valtio";
import { gameLoop } from "@/game/logic";
import { FaArrowUp } from 'react-icons/fa';

import { Button } from "@/components/ui/button"

export default function AgeUp() {
    const snap = useSnapshot(state);

    return (
        <Button
            onClick={gameLoop}
            variant="default"
            className="flex items-center space-x-2 w-40 h-16 text-lg rounded-full"
        >
            <FaArrowUp className="size-6" />
            <span>Age Up</span>
        </Button>
    );
}
