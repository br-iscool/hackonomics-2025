import { state } from "@/game/state";
import { useSnapshot } from "valtio";
import { gameLoop } from "@/game/logic";

import { Button } from "@/components/ui/button"

export default function AgeUp() {
    const snap = useSnapshot(state);

    return (
        <>
            <button onClick={gameLoop} className="flex items-center space-x-2 p-6 bg-gradient-to-br bg-gray-800 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-200 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                </svg>
                <span>Age Up</span>
            </button>
        </>
    )
}