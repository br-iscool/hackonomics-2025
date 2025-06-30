import Link from "next/link"

export default function Info() {
    return (
        <>
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <h2 className="mb-8 text-center text-4xl tracking-tight font-bold">Information</h2>
                <div className="grid pt-8 text-left border-t border-gray-950/5 md:gap-16 md:grid-cols-2">
                    <div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What is this project?</h3>
                            <p className="text-gray-500">
                                Balancing Act is an interactive financial life simulation game. Players begin their journey at age 16 and navigate through life by making crucial financial and personal decisions. The primary objective is to achieve $1 million while managing stress.
                            </p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What inspired us to create this project?</h3>
                            <p className="text-gray-500">The idea for Balancing Act came from our one of our developer's experiences watching others struggling to navigate their own personal finance as a young adult. As a result, we wanted to create a safe and engaging environment where players could experiment with different financial strategies and life paths without real-world risk. </p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What was used to create this project?</h3>
                            <p className="text-gray-500">This project is a web application built with Next.js, Typescript, and TailwindCSS. Additionally, we used various libraries in our game.</p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">How does this project improve the user's financial literacy skills?</h3>
                            <p className="text-gray-500">
                                The game improves financial literacy by simulating real-world scenarios. Players learn about the impact of educational choices on career paths, learn to manage income and expenses, and see how their decisions affect their life.
                            </p>{" "}
                        </div>
                    </div>
                    <div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What were some challenges that we had creating this project?</h3>
                            <p className="text-gray-500">
                                One of the biggest challenges was balancing realism with engaging gameplay. We spent a lot of time designing the economic model behind the game—things like salary progression, investment returns, and the impact of life events. Striking that perfect balance to ensure the game was both fun and informative was a key focus of our development process.
                            </p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What did we learn while creating this project?</h3>
                            <p className="text-gray-500">
                                Developing this project taught us a great deal about financial systems. We had to do our own research in order to implement the game logic properly and make sure it was as realistic as possible in order to educate users in financial literacy. Also, we learned a lot about state management in React. 
                            </p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What's next for this project?</h3>
                            <p className="text-gray-500">
                                Our future includes updating the game with more diverse career paths, investment options like stocks and real estate, and a wider range of random life events to increase replayability. We also plan to share our game with educational places like schools. 
                            </p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">I have questions. How do I contact you?</h3>
                            <p className="text-gray-500">
                                This project is open-source and you can find more information on our GitHub page <Link className="underline" href="https://github.com/br-iscool/hackonomics-2025/" target="_blank" rel="noopener noreferrer">here</Link>. You can also send an email to us at <a href="mailto:brian.d3.2008@gmail.com" className="underline">brian.d3.2008@gmail.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}