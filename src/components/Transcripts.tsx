interface Transcripts {
	messages: string[];
}

export default function Transcripts({ messages }: Transcripts) {
	function Message({ text }: { text: string }) {
		console.log(text);
		return <div className="w-5/6 bg-blue-800 px-2 py-1 rounded-xl text-white">{text}</div>;
	}

	return (
		<>
			<div className="p-5 w-full h-full bg-gray-600 rounded-xl">
				{messages.map((msg, i) => (
					<Message key={i} text={msg} />
				))}
			</div>
		</>
	);
}
