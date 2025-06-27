import { Card, CardContent } from "@/components/ui/card";
import { FaCreditCard } from "react-icons/fa";

export function CreditCard({ data }: { data: any }) {
  return (
    <Card className="w-64">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <FaCreditCard /> <span className="font-semibold">Credit Card</span>
        </div>
        <div className="text-sm mt-2">Balance: ${data.balance?.toLocaleString() ?? 0}</div>
        <div className="text-sm">Limit: ${data.limit?.toLocaleString() ?? 0}</div>
      </CardContent>
    </Card>
  );
}
