interface StatInfoProps {
	stress: number;
	money: number;
}

export default function StatInfo({ stress, money }: StatInfoProps) {
	const stressColor = stress < 40 ? "bg-green-500" : stress < 70 ? "bg-yellow-500" : "bg-red-500";

	return (
		<div className="bg-gray-900/75 p-4 rounded-xl shadow-md w-80">
			<div className="mb-4">
				<p className="text-white/80 mb-1">Stress:</p>
				<div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
					<div className={`${stressColor} h-full`} style={{ width: `${Math.min(Math.max(stress, 0), 100)}%` }}></div>
				</div>
			</div>
			<div className="flex items-center justify-between text-white/80">
				<p>Money:</p>
				<p className="font-semibold text-green-500">${money.toLocaleString()}</p>
			</div>
		</div>
	);
}
