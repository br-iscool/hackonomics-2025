import { useSnapshot } from "valtio";
import { state, resetState } from "@/game/state";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaTrophy, FaCoins, FaCalendarAlt, FaCreditCard, FaGraduationCap, FaBriefcase } from "react-icons/fa";

interface EndDialogProps {
    open: boolean;
    onRestart: () => void;
}

export default function EndDialog({ open, onRestart }: EndDialogProps) {
    const snap = useSnapshot(state);

    const handleRestart = () => {
        onRestart();
    };

    return (
        <AlertDialog open={open} onOpenChange={() => {}}>
            <AlertDialogContent className="max-w-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-3xl font-bold text-yellow-500 flex items-center justify-center gap-2">
                        <FaTrophy className="text-yellow-500" />
                        Congratulations! You Won!
                        <FaTrophy className="text-yellow-500" />
                    </AlertDialogTitle>
                </AlertDialogHeader>
                
                <div className="space-y-4 pt-2">
                    <div className="text-center">
                        <h2 className="font-semibold mb-2">
                            You've mastered the art of financial management and successfully reached 2.5 million dollars to retire!
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 xs:grid-cols-1 gap-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCoins className="text-green-500" />
                                    <h3 className="font-semibold">Final Wealth</h3>
                                </div>
                                <p className="text-2xl font-semibold text-green-600">
                                    ${snap.money.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Debt: ${snap.debt.toFixed(2)}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCalendarAlt className="text-blue-500" />
                                    <h3 className="font-semibold">Life Stats</h3>
                                </div>
                                <p className="text-sm">Final age: {snap.age}</p>
                                <p className="text-sm">
                                    Final stress: {snap.stress}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaGraduationCap className="text-indigo-500" />
                                    <h3 className="font-semibold">Education & Career</h3>
                                </div>
                                <p className="text-sm">
                                    Education: {snap.education?.level || "Highschool"}
                                </p>
                                <div className="flex items-center gap-1">
                                    <p className="text-sm">
                                        Final job: {snap.job?.role || "Unemployed"}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCreditCard className="text-purple-500" />
                                    <h3 className="font-semibold">Credit Score</h3>
                                </div>
                                <p className="text-sm">
                                    Final credit score:
                                </p>
                                <p className="text-xl font-bold">
                                    {Math.round(snap.creditScore)}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {snap.stress >= 75 && (
                        <Card className="border-yellow-200 bg-yellow-50">
                            <CardContent className="p-4">
                                <p className="text-center text-yellow-700">
                                    You achieved wealth but with high stress ({snap.stress}%). 
                                    Remember, true success includes mental well-being!
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    <div className="text-center space-y-2">
                        <p className="text-sm text-gray-600">
                            Thank you for playing Balancing Act! We hoped you enjoyed the game and learned something new.
                        </p>
                        <Button onClick={handleRestart} className="bg-blue-600 hover:bg-blue-700 cursor-pointer mt-2">
                            Play Again
                        </Button>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}