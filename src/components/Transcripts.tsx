import { Card, CardContent, CardTitle } from "./ui/card";

interface TranscriptProps {
	messages: string[];
}

export default function Transcripts({ messages }: TranscriptProps) {
	function Message({ text }: { text: string }) {
		return <div className="w-5/6 bg-blue-800 px-2 py-1 rounded-xl text-white">{text}</div>;
	}

	return (
		<>
			<Card className="h-full w-full bg-white">
				<CardTitle className="text-center text-2xl font-bold">Transcript</CardTitle>
				<CardContent className="flex flex-col items-center gap-2 p-4 overflow-y-auto">
					{messages.map((msg, i) => (
						<Message key={i} text={msg} />
					))}
				</CardContent>
			</Card>
		</>
	);
}
