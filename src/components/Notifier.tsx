import { useSnapshot } from "valtio";
import { toast } from "sonner";
import { state } from "@/game/logic/game-state";
import { useStateChangeNotifier } from "@/lib/hooks";

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

  useStateChangeNotifier(snap.family.value, (oldVal, newVal) => {
    const tempOldVal = oldVal ?? 0;
    const tempNewVal = newVal ?? 0;
    const diff = tempNewVal - tempOldVal;
    if (diff !== 0) {
      const isPositive = diff > 0;
      const amount = Math.abs(diff);
      (isPositive ? toast.success : toast.error)(
        `${isPositive ? "❤️ Closeness to family increased" : "💔 Closeness to family decreased"} by ${amount}`
      );
    }
  });

  return null;
}
