"use client";

import { state } from "@/game/state";
import { useSnapshot } from "valtio";

import {
    AgeUp,
    ProfileIcon,
    Transcripts,
    EducationInfo,
    JobInfo,
    FinanceInfo,
    ProductsDisplay,
    GameOverDialog,
    EventManager,
} from "@/components/exports";
import { Notifier } from "@/components/Notifier";

export default function Game() {
    const snap = useSnapshot(state);

    return (
        <>
            <Notifier />
            <GameOverDialog />
            {snap.alive && snap.event && <EventManager event={snap.event} />}

            <div className="bg-[radial-gradient(circle,rgba(105,105,105)_0%,black_50%)] min-h-screen flex">
                <div className="w-2/3 min-h-screen flex flex-col justify-between">
                    {/* Header */}
                    <div className="p-5 flex items-center justify-between gap-8">
                        <EducationInfo education={snap.education} />
                        {snap.job && <JobInfo job={snap.job} />}
                        <FinanceInfo />
                        <AgeUp />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-5">
                        <ProductsDisplay />
                    </div>

                    {/* Fixed bottom profile icon */}
                    <div className="fixed bottom-10 left-5 flex gap-4">
                        <ProfileIcon />
                    </div>
                </div>

                <div className="w-1/3 min-h-screen p-8">
                    <Transcripts messages={state.transcript} />
                </div>
            </div>
        </>
    );
}
