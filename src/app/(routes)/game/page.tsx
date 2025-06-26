"use client";

import { state } from "@/game/state";
import { useSnapshot } from "valtio";
import { useState } from "react";

import { Button } from "@/components/ui/button"

import ActionButton from "@/components/ActionButton";
import AgeUp from "@/components/AgeUp";
import ProfileIcon from "@/components/ProfileIcon";
import Transcripts from "@/components/Transcripts";
import Event from "@/components/events/Event";

export default function Game() {
    const snap = useSnapshot(state);
    const [inputName, useInputState] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(snap);
        state.name = inputName;
        console.log("Player name set to:", snap.name);
    }

    return (
        <>
            <div className="bg-[radial-gradient(circle,rgba(105,105,105)_0%,black_50%)] min-h-screen">
                <div className="p-5">
                    <ProfileIcon
                        name={snap.name}
                        job="Software Engineer"
                        stress={snap.stress}
                        money={snap.money}
                    />
                </div>

                <div className="flex">
                    <ul>
                        <li>
                            <ActionButton text="Education" />
                        </li>
                        <li>
                            <ActionButton text="Job" />
                        </li>
                        <li>
                            <ActionButton text="Assets" />
                        </li>
                        <li className="p-4">
                            <AgeUp />
                        </li>
                    </ul>

                    {/* Right content */}
                    <div className="flex flex-1 justify-end items-start p-8">
                        <Transcripts messages={state.events} />
                    </div>
                </div>
            </div>
            <Button className="fixed bottom-4 right-4" variant="outline" onClick={() => {state.stress+=20;}}>Test - increase stress button</Button>

            {snap.event && <Event event={snap.event} />}
            
           
        </>
    );
}
