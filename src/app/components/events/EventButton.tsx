interface EventProps {
    text: string;
}

export default function EventButton({ text }: EventProps) {
    return (
        <button className="p-4 mx-4 bg-blue-600 text-center justify-center rounded-lg cursor-pointer hover:bg-blue-800 transition-all duration-150">
            <div className="text-white font-medium">
                <p>{ text }</p>
            </div>
        </button>
    )
}