"use client";

import { state } from "@/game/state";
import { useSnapshot } from "valtio";

import { Button } from "@/components/ui/button"

import ActionButton from "@/components/ActionButton";
import AgeUp from "@/components/AgeUp";
import ProfileIcon from "@/components/ProfileIcon";
import Transcripts from "@/components/Transcripts";
import Event from "@/components/events/Event";

export default function Game() {
    const snap = useSnapshot(state);

    return (
        <>
            <div className="bg-[radial-gradient(circle,rgba(105,105,105)_0%,black_50%)] min-h-screen">
                <div className="p-5">
                    <ProfileIcon />
                </div>

                <div className="flex">
                    <ul>
                        {["Education", "Job", "Assets"].map((text) => (
                            <li key={text}>
                                <ActionButton text={text} />
                            </li>
                        ))}
                        <li className="p-4">
                            <AgeUp />
                        </li>
                    </ul>

                    {snap.event && <Event key={snap.event.name} event={snap.event} />}

                    {/* Right content */}
                    <div className="flex flex-1 justify-end items-start p-8">
                        <Transcripts messages={state.transcript} />
                    </div>

                </div>
            </div>
            <Button className="fixed bottom-4 right-4" variant="outline" onClick={() => { console.log(snap.event) }}>Test</Button>
        </>
    );
}
