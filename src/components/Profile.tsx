import { useSnapshot } from "valtio";
import { state } from "@/game/state";
import Image from "next/image";

export default function Profile() {
	const snap = useSnapshot(state);

	const stressPercent = Math.min(Math.max(snap.stress, 0), 100);
	const stressColor = snap.stress < 40 ? "bg-green-500" : snap.stress < 70 ? "bg-yellow-500" : "bg-red-500";

	return (
		<div className="w-full max-w-2xl bg-white border border-white/10 rounded-2xl shadow-xl p-6 flex gap-6 items-start">
			<Image
				src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
				alt="Profile picture"
				width={64}
				height={64}
				className="rounded-full object-cover border border-white/20"
			/>

			<div className="flex-1 grid grid-cols-2 gap-4">
				{/* Left Column */}
				<div className="space-y-1">
					<p className="text-xl font-semibold">{snap.name}</p>
					<p className="text-sm">{snap.job?.role || "Unemployed"}</p>
					<p className="text-sm">Age: {snap.age}</p>

					<div className="mt-4">
						<p className="text-sm mb-1">Stress</p>
						<div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
							<div
								className={`absolute inset-0 ${stressColor} h-full rounded-full transition-all duration-300`}
								style={{ width: `${stressPercent}%` }}
							/>
						</div>
					</div>
				</div>

				{/* Right Column */}
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span>Money:</span>
						<span className="font-semibold text-green-400">
							${snap.money.toLocaleString()}
						</span>
					</div>

					<div className="flex justify-between">
						<span>Debt:</span>
						<span>${snap.debt.toFixed(2)}</span>
					</div>

					<div className="flex justify-between">
						<span>Income:</span>
						<span>${snap.income.toFixed(2)}</span>
					</div>

					<div className="flex justify-between">
						<span>Expenses:</span>
						<span>${snap.totalExpenses.toFixed(2)}</span>
					</div>

					<div className="flex justify-between">
						<span>Education:</span>
						<span>{snap.education?.level || "None"}</span>
					</div>

					<div className="flex justify-between">
						<span>Credit Score:</span>
						<span>{Math.round(snap.creditScore)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
