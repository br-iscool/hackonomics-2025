"use client";

import { state } from "@/game/state";
import { useSnapshot } from "valtio";

import { Button } from "@/components/ui/button"
import { AgeUp, ProfileIcon, Transcripts, EducationInfo, JobInfo, FinanceInfo, ProductsDisplay, GameOverDialog, EventManager } from "@/components/exports";

export default function Game() {
    const snap = useSnapshot(state);

    return (
        <>
            <GameOverDialog />
            {snap.alive && snap.event && (
                <EventManager key={snap.event.name} event={snap.event} />
            )}
            <Button className="fixed bottom-4 right-4" variant="outline" onClick={() => { console.log(snap.event) }}>Test</Button>

            {/* <div className="bg-[radial-gradient(circle,rgba(105,105,105)_0%,black_50%)] min-h-screen"> */}
            <div className="min-h-screen">
                {/* Header */}
                <div className="p-5">
                    <ProfileIcon />
                </div>

                <div className="flex">
                    {/* Left Panel */}
                    <ul>
                        <li className="p-4">
                            <EducationInfo education={snap.education} />
                        </li>
                        {snap.job && <li className="p-4">
                            <JobInfo job={snap.job} />
                        </li>}
                        <li className="p-4">
                            <FinanceInfo />
                        </li>
                        <li className="p-4">
                            <AgeUp />
                        </li>
                    </ul>

                    <div className="flex flex-col items-center flex-1">
                        <ProductsDisplay />
                    </div>

                    {/* Right Panel */}
                    <div className="flex flex-1 justify-end items-start p-8">
                        <Transcripts messages={state.transcript} />
                    </div>

                </div>
            </div>
        </>
    );
}
