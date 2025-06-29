import { useSnapshot } from "valtio";
import { toast } from "sonner";
import { state } from "@/game/state";
import { useStateChangeNotifier } from "@/hooks";

export function Notifier() {
  const snap = useSnapshot(state);

  useStateChangeNotifier(snap.money, (oldVal, newVal) => {
    const diff = newVal - oldVal;
    if (diff !== 0) {
      const isPositive = diff > 0;
      const amount = Math.abs(diff);
      (isPositive ? toast.success : toast.error)(
        `$${isPositive ? "+" : "-"}${amount.toFixed(2)}`,
      );
    }
  });

  useStateChangeNotifier(snap.stress, (oldVal, newVal) => {
    const diff = newVal - oldVal;
    if (diff !== 0) {
      const isPositive = diff > 0; // more stress is bad
      const amount = Math.abs(diff);
      (isPositive ? toast.error : toast.success)(
        `${isPositive ? "😟 Stress increased" : "😌 Stress reduced"} by ${amount}`,
      );
    }
  });

  useStateChangeNotifier(snap.creditScore, (oldVal, newVal) => {
    const diff = newVal - oldVal;
    if (diff !== 0) {
      const isPositive = diff > 0;
      const amount = Math.abs(diff);
      (isPositive ? toast.success : toast.error)(
        `${isPositive ? "📈 Credit score increased" : "📉 Credit score decreased"} by ${amount}`,
      );
    }
  });

  return null;
}
