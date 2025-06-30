import { Card, CardContent } from "@/components/ui/card";
import { useSnapshot } from "valtio";
import { state } from "@/game/logic/game-state";

export function Car() {
    const snap = useSnapshot(state);

    const car = snap.products.car || snap.car;

    const getTypeEmoji = (type: string) => {
        switch (type) {
            case "Luxury": return "🏎️";
            case "Average": return "🚗";
            case "Cheap": return "🚐";
            case "None": return "🚌";
        }
    };

    if (!car) {
        return null;
    }

    return (
        <Card className="col-span-1 py-0">
            <CardContent className="p-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeEmoji(car.type)}</span>
                    <span className="font-semibold">{car.name}</span>
                </div>
                <div className="text-sm">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Type:</span>
                        <span>{car.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Purchase Price:</span>
                        <span>${car.value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Transportation Cost:</span>
                        <span>${snap.expenses.transportation?.toLocaleString() || 0}/year</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}