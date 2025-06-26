interface EventButtonProps {
    text: string;
}

export default function EventButton(props: EventButtonProps) {

    return (
        <button className="p-4 mx-4 bg-blue-600 text-center justify-center rounded-lg cursor-pointer hover:bg-blue-800 transition-all duration-150">
            <div className="text-white font-medium">
                <p>{props.text}</p>
            </div>
        </button>
    )
}