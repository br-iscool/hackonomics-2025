import { useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "@/game/logic/game-state";
import { startGame } from "@/game/logic/game-loop";

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function WelcomeDialog() {
    const snap = useSnapshot(state);
    const [nameInput, setNameInput] = useState("");

    const handleStartGame = () => {
        if (nameInput.trim()) {
            state.name = nameInput.trim();
            startGame();
            // maybe add an else block?
        }
    };

    return (
        <AlertDialog open={snap.opened}>
            <AlertDialogContent className="max-w-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Welcome to Balancing Act!</AlertDialogTitle>
                    <AlertDialogDescription>
                        A financial life simulation game where you make life decisions and balance your finances.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Card>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                            <p className="font-semibold">How to Play:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Start at age 16 with $5,000, reach $1 million to win</li>
                                <li>Make financial decisions wisely to grow your wealth</li>
                                <li>The top bar shows your money, stress, and other stats</li>
                                <li>Avoid bankruptcy to keep playing</li>
                                <li>Press age up at the bottom to progress</li>
                            </ul>
                        </div>
                        
                        <div className="space-y-2">
                            <label htmlFor="player-name" className="text-sm font-medium">
                                Enter your name to begin:
                            </label>
                            <Input
                                id="player-name"
                                type="text"
                                placeholder="Your name"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && nameInput.trim()) {
                                        handleStartGame();
                                    }
                                }}
                                autoFocus
                            />
                        </div>
                    </CardContent>
                </Card>

                <AlertDialogFooter>
                    <Button 
                        onClick={handleStartGame}
                        disabled={!nameInput.trim()}
                        className="w-full"
                    >
                        Start Playing
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}