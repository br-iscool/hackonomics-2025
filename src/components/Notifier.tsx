import { useSnapshot } from "valtio";
import { toast } from "sonner";
import { state } from "@/game/state";
import { useStateChangeNotifier } from "@/hooks";

export function Notifier() {
  const snap = useSnapshot(state);

  useStateChangeNotifier(snap.money, (oldVal, newVal) => {
    const diff = newVal - oldVal;
    if (diff !== 0) {
      toast(
        diff > 0 ? `🟢 +$${diff.toLocaleString()}` : `🔴 -$${Math.abs(diff).toLocaleString()}`,
        { description: "Money changed", duration: 2000 }
      );
    }
  });

  useStateChangeNotifier(snap.stress, (oldVal, newVal) => {
    const diff = newVal - oldVal;
    if (diff !== 0) {
      toast(
        diff > 0 ? `😟 Stress increased by ${diff}` : `😌 Stress decreased by ${Math.abs(diff)}`,
        { description: "Stress level update", duration: 2000 }
      );
    }
  });

  useStateChangeNotifier(snap.creditScore, (oldVal, newVal) => {
    const diff = newVal - oldVal;
    if (diff !== 0) {
      toast(
        diff > 0 ? `📈 Credit score improved by ${diff}` : `📉 Credit score dropped by ${Math.abs(diff)}`,
        { description: "Credit score update", duration: 2000 }
      );
    }
  });

  return null;
}
