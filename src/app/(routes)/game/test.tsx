import React from "react";
import { useSnapshot } from "valtio";
import { state } from "@/game/state";
import { gameLoop } from "@/game/logic";

const FinanceGameUI: React.FC = () => {
  const snap = useSnapshot(state);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Finance Life</h1>

      <div className="space-y-1">
        <p><strong>Name:</strong> {snap.playerName}</p>
        <p><strong>Age:</strong> {snap.age}</p>
        <p><strong>Money:</strong> ${snap.money.toFixed(2)}</p>
        <p><strong>Net Worth:</strong> ${snap.netWorth.toFixed(2)}</p>
        <p><strong>Debt:</strong> ${snap.debt.toFixed(2)}</p>
        <p><strong>Income:</strong> ${snap.income.toFixed(2)}</p>
        <p><strong>Job:</strong> {snap.job || "Unemployed"}</p>
        <p><strong>Education:</strong> {snap.education || "None"}</p>
        <p><strong>Credit Score:</strong> {Math.round(snap.creditScore)}</p>
      </div>

      <div className="space-y-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={gameLoop}
        >
          Next Year
        </button>

        {snap.events.length > 0 && (
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h2 className="font-bold">Recent Events</h2>
            <ul className="list-disc ml-6">
              {snap.events.slice(-5).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceGameUI;