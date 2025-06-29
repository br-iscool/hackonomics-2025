import { SavingsAccData } from "@/game/types";

import { Card, CardContent } from "@/components/ui/card";
import { FaPiggyBank } from "react-icons/fa";

export function SavingsCard({ data }: { data: SavingsAccData }) {
    return (
        <Card className="col-span-1">
            <CardContent className="p-4">
                <div className="flex items-center gap-2">
                    <FaPiggyBank /> <span className="font-semibold">{data.name}</span>
                </div>
                <div className="text-sm mt-2">Balance: ${data.balance.toLocaleString()}</div>
                <div className="text-sm">
                    Interest Rate:{" "}
                    {`${(data.interestRate * 100).toFixed(1)}%`}
                </div>
            </CardContent>
        </Card>
    );
}
