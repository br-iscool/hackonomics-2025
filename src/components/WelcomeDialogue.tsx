import { useSnapshot } from "valtio";
import { state } from "@/game/state";

import { AlertDialog } from "@/components/ui/alert-dialog";

export default function WelcomeDialogue() {
    const snap = useSnapshot(state);

    return (
        <AlertDialog open={snap.opened}></AlertDialog>
    )
}