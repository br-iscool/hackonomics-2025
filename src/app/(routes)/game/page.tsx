"use client";

import { useGameStore } from "@/game/state"
import { useState } from "react";

import ActionButton from "@/app/components/ActionButton"
import AgeUp from "@/app/components/AgeUp"
import ProfileIcon from "@/app/components/ProfileIcon"

export default function Game() {
    const GameState = useGameStore.getState();
    const [inputName, useInputState] = useState();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Prevent page reload
        GameState.playerName = inputName;
    }

    return (
        <>
            <div className="bg-[radial-gradient(circle,rgba(105,105,105)_0%,black_50%)] min-h-screen">
                <div className="p-5">
                    <ProfileIcon name="John Doe" job="Software Engineer" stress={10} money={250} />
                </div>
                
                <AgeUp />

                <div className="flex">
                    <ul>
                        <li><ActionButton text="Education" /></li>
                        <li><ActionButton text="Job" /></li>
                        <li><ActionButton text="Assets" /></li>
                    </ul>
                </div>
            </div>

            <div className="h-full w-full bg-black/50 p-4">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nameInput" className="block text-white">Name:</label>
                    <input type="text" id="nameInput" value={inputName} className="p-2 rounded" />
                    <button type="submit"> Go</button>
                </form>
            </div>
        </>
    )
}