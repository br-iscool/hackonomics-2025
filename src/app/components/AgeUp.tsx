export default function AgeUp() {
    return (
        <>
            <button className="flex items-center space-x-2 p-6 bg-gradient-to-br bg-gray-800 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-200 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                </svg>
                <span>Age Up</span>
            </button>
        </>
    )
}