"use client";

import { state } from "@/game/state";
import { useSnapshot } from "valtio";

import { AgeUp, ProfileIcon, Transcripts, EducationInfo, JobInfo, FinanceInfo, ProductsDisplay, GameOverDialog, EventManager, WelcomeDialogue } from "@/components/exports";
import { Notifier } from "@/components/Notifier";

export default function Game() {
    const snap = useSnapshot(state);

    return (
        <>
            <Notifier />
            <WelcomeDialogue />
            <GameOverDialog />
            {snap.alive && snap.event && <EventManager event={snap.event} />}

            <div className="bg-[radial-gradient(circle,rgba(105,105,105)_0%,black_50%)] min-h-screen">
                <div className="min-h-screen">
                    {/* Header */}
                    <div className="p-5 flex items-center gap-8">
                        <ProfileIcon />
                    </div>

                    <div className="flex-1 p-5">
                        <ProductsDisplay />
                    </div>

                    <div className="flex">
                        <div className="flex flex-1 justify-end items-start p-8">
                            <Transcripts messages={state.transcript} />
                        </div>
                    </div>

                    <div className="fixed bottom-10 left-5 flex gap-4">
                        <EducationInfo education={snap.education} />
                        {snap.job && <JobInfo job={snap.job} />}
                        <FinanceInfo />
                        <AgeUp />
                    </div>
                </div>
            </div>
        </>
    );
}