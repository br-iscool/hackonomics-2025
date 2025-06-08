interface ActionButtonProps {
	text: string;
	icon?: React.ReactNode;
}

export default function ActionButton({ text, icon }: ActionButtonProps) {
	return (
		<>
			<div className="p-4">
				<button type="button" className="w-40 h-16 text-white text-lg rounded-lg bg-gray-700/75 hover:bg-gray-900 ring-3 ring-black px-5 py-2.5 text-center justify-center items-center inline-flex transition-all duration-150 cursor-pointer">
					{text}
				</button>
			</div>
		</>
	);
}
