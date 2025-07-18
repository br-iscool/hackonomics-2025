"use client";

import { uistate } from "@/lib/state"
import { state } from "@/game/logic/game-state";
import { useSnapshot } from "valtio";

import { AgeUp, Profile, Transcripts, EducationDialog, JobDialog, FinanceDialog, Products, GameOverDialog, EventManager, WelcomeDialog, JobSearchDialog, EndDialog } from "@/components/exports";
import { Notifier } from "@/components/Notifier";
import LifeDialog from "@/components/dialogs/LifeDialog";

export default function Game() {
    const snap = useSnapshot(state);
    const uisnap = useSnapshot(uistate);

    return (
        <>
            <Notifier />
            <WelcomeDialog />
            <GameOverDialog
                onRestart={() => window.location.reload()}
            />
            <EndDialog 
                open={snap.won} 
                onRestart={() => window.location.reload()} 
            />
            <EventManager />
            <JobSearchDialog open={uisnap.showJobSearch}
                onOpenChange={(val) => (uistate.showJobSearch = val)}
                onJobSelected={(message) => {uistate.jobResult = message;}} />

            <div className="bg-gray-200 min-h-screen flex flex-col md:flex-row">
                <div className="min-h-screen w-full md:w-2/3">
                    <div className="p-5 flex items-center gap-8">
                        <Profile />
                    </div>

                    <div className="flex-1 p-5">
                        <Products />
                    </div>

                    <div className="fixed bottom-10 left-5 flex gap-4">
                        <EducationDialog education={snap.education} />
                        <JobDialog job={snap.job} />
                        <FinanceDialog />
                        <LifeDialog />
                        <AgeUp />
                    </div>
                </div>
                <div className="min-h-screen w-full md:w-1/3">
                    <div className="h-full flex flex-1 justify-end items-start p-8">
                        <Transcripts messages={state.transcript} />
                    </div>
                </div>
            </div>
        </>
    );
}