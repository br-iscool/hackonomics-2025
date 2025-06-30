import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSnapshot } from "valtio";
import { state } from "@/game/logic/game-state";

import { FaHeart, FaBaby, FaUserFriends, FaHeartbeat, FaRing, FaCalendarAlt } from "react-icons/fa";

export default function LifeDialog() {
    const snap = useSnapshot(state);

    const getRelationshipStatus = () => {
        if (!snap.family.spouse) return "Single";
        return snap.family.spouse.spouseStatus === "Married" ? "Married" : "In Relationship";
    };

    const getHealthStatus = () => {
        if (snap.stress >= 80) return "Critical";
        if (snap.stress >= 50) return "Poor"; 
        if (snap.stress >= 25) return "Fair";
        return "Good";
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-40 h-16 text-lg" variant="default">
                    {"Life"}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FaHeart className="h-5 w-5"/>Life Overview
                    </DialogTitle>
                </DialogHeader>

                <div className="p-4 space-y-6">
                    <div className="flex items-center gap-3">
                        <FaHeartbeat className="text-muted-foreground"/>
                        <span className="font-medium">Stress Status:</span>
                        <span>{getHealthStatus()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaHeartbeat className="text-muted-foreground"/>
                        <span className="font-medium">Stress Level:</span>
                        <span>{snap.stress}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaRing className="text-muted-foreground"/>
                        <span className="font-medium">Relationship Status:</span>
                        <span>{getRelationshipStatus()}</span>
                    </div>
                    {snap.family.spouse && (
                        <div className="flex items-center gap-3">
                            <FaUserFriends className="text-muted-foreground"/>
                            <span className="font-medium">Partner's Age:</span>
                            <span>{snap.family.spouse.age}</span>
                        </div>
                    )}
                    {snap.family.spouse?.yearsWithPartner !== undefined && (
                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-muted-foreground"/>
                            <span className="font-medium">Years Together:</span>
                            <span>{snap.family.spouse.yearsWithPartner}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-3">
                        <FaBaby className="text-muted-foreground"/>
                        <span className="font-medium">Number of Children:</span>
                        <span>{snap.family.children?.length || 0}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}