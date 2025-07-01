export default function Home() {
	return (
		<main className="px-6 py-12">
			<section className="max-w-6xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">Balancing Act - Finance Game</h1>
				<p className="text-lg text-gray-600 mb-8">A financial life simulator where every choice matters. From 16 years old, balance stress, manage money, and shape your future.</p>

				 <div className="bg-white p-6 rounded-xl shadow-md mb-12">
					<h2 className="text-2xl font-semibold mb-4">🚀 Project Pitch</h2>
					<ul className="list-disc list-inside text-gray-700 space-y-1">
						<li>A financial life simulator where every choice matters. From 16 years old, balance stress, manage money, and become a millionaire.</li>
					</ul>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-md mb-12">
					<h2 className="text-2xl font-semibold mb-4">🎮 Game Features</h2>
					<ul className="list-disc list-inside text-gray-700 space-y-1">
						<li>Stats: Stress Level, Money, Credit Score, Debt</li>
						<li>Life Stages: Education, Job, Marriage, Retirement</li>
						<li>Financial Market: Loans, Savings, Assets</li>
						<li>Events: Trips, Illnesses, Surprises</li>
						<li>Careers: Trades, Part-time, Undergraduate, Graduate</li>
					</ul>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-md">
					<h2 className="text-2xl font-semibold mb-2">🎥 Video Demo</h2>
					<p className="text-gray-700 mb-2">Watch a walkthrough of the gameplay and features:</p>
					<div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center text-gray-600">
						<iframe height="650" width="1500" src="https://www.youtube.com/embed/VE_-2r8XtYc?si=PER2FPUSPuWofw-D" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
					</div>
				</div>

				<div className="text-center flex gap-5 justify-center pt-10">
					<a href="/game" className="inline-block bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300">
						Play the Game
					</a>

					<a href="/info" className="inline-block bg-blue-500 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300">
						Learn More
					</a>
				</div>
			</section>
		</main>
	);
}
