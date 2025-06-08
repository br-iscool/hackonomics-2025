import Image from "next/image";

interface ProfileIconProps {
	name: string;
	job: string;
	stress: number;
	money: number;
}

export default function ProfileIcon({ name, job, stress, money }: ProfileIconProps) {
	const stressColor = stress < 40 ? "bg-green-500" : stress < 70 ? "bg-yellow-500" : "bg-red-500";

	return (
		<>
			<div className="flex items-center space-x-4 p-5 bg-gray-900/75 rounded-xl shadow-md w-max">
				<Image className="rounded-full object-cover" width={48} height={48} src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="Profile picture" />

				<div>
					<p className="text-m font-medium text-white">{ name }</p>
					<p className="text-s text-gray-500">{ job }</p>
				</div>

				<div className="w-px h-15 bg-white"></div>

				<div className="mb-4">
					<p className="text-white/80 mb-1">Stress:</p>
					<div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
						<div className={`${stressColor} h-full`} style={{ width: `${Math.min(Math.max(stress, 0), 100)}%` }}></div>
					</div>
				</div>
				<div className="flex items-center justify-between text-white/80">
					<p className="pr-2">Money:</p>
					<p className="font-semibold text-green-500">${money.toLocaleString()}</p>
				</div>
			</div>

				
		</>
	);
}
