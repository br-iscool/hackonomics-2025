"use client";

import { useGameStore } from "@/game/state"
import { useState } from "react";

import ActionButton from "@/app/components/ui/ActionButton"
import AgeUp from "@/app/components/ui/AgeUp"
import ProfileIcon from "@/app/components/ui/ProfileIcon"
import PopUp from "@/app/components/events/Event";
import Transcripts from "@/app/components/ui/Transcripts";

export default function Game() {
    const GameState = useGameStore.getState();
    const { life } = GameState
    const [inputName, useInputState] = useState();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(GameState)
        GameState.playerName = inputName;
        console.log("Player name set to:", GameState.playerName);
    }

    return (
        <>
            <div className="bg-[radial-gradient(circle,rgba(105,105,105)_0%,black_50%)] min-h-screen">
                <div className="p-5">
                    <ProfileIcon name="John Doe" job="Software Engineer" stress={10} money={250} />
                </div>

                <div className="flex">
                    <ul>
                        <li><ActionButton text="Education" /></li>
                        <li><ActionButton text="Job" /></li>
                        <li><ActionButton text="Assets" /></li>
                        <li className="p-4"><AgeUp /></li>
                    </ul>

                    {/* Right content */}
                    <div className="flex flex-1 justify-end items-start p-8">
                        <Transcripts messages={life.events} />
                    </div>
                </div>
            </div>

            <PopUp name="Test Event" description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum excepturi dolore voluptates dolores magnam nemo possimus vero illum exercitationem nobis! Facilis quod provident sunt esse sapiente eum quos itaque ratione." icon="🚀" />

            {/* 
            <div className="h-full w-full bg-black/50 p-4">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nameInput" className="block text-white">Name:</label>
                    <input type="text" id="nameInput" value={inputName} className="p-2 rounded bg-white" />
                    <button type="submit"> Go</button>
                </form>
            </div>
            */}
        </>
    )
}