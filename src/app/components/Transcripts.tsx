interface Transcripts {
    messages : string[];
}

export default function Transcripts({messages} : Transcripts) {    
    function Message({text} : {text : string}) {
        console.log(text);
        return (
            <div className="w-5/6 bg-blue-800 rounded-4xl text-white">
                {text}
            </div>
        )
    }

	return (
		<>
        <div className="p-5 h-5/6 w-[20rem] bg-gray-600 rounded-xl absolute">
            {messages.map((msg, i) => (
                <Message key={i} text={msg} />
            ))}
        </div>
		</>
	);
}
