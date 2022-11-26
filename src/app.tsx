import React from 'react'
import '@/app.css'

export const App = () => {
	return (
		<div className="main-layout">
			<div className="w-72 overflow-y-auto overflow-x-hidden bg-zinc-700 flex flex-col justify-between">
				<div>
					<div className="text-gray-200 header">
						<h2 className="text-4xl p-5 pl-10 border-b border-zinc-600">React FE</h2>
					</div>
					<menu className="text-xl pl-5 pt-5 pr-5">
						<ul>
							<li className="p-3 text-zinc-100 hover:bg-zinc-500 hover:rounded-md hover:cursor-pointer"><span className="text-white text-2xl mr-1">♥</span>Memory</li>
							<li className="p-3 text-gray-200"><span className="text-white text-2xl mr-1">♥</span>Counter</li>
							<li className="p-3 text-gray-200"><span className="text-white text-2xl mr-1">♥</span> Starts</li>
						</ul>
					</menu>
				</div>
				<div className="pl-2 pb-1 text-zinc-300">
					<p>Made with <span className="text-rose-600 text-xl">♥</span> in <a href="#">Rumia</a></p>
				</div>
			</div>
			<main className="p-10 bg-slate-100">
				<h1 className="text-base text-gray-500">MEMORY</h1>
				<div className="bg-gray-50 m-10 w-min rounded-xl border-zinc-300 border">
					<div className="p-10 w-96">
						AAA
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						BBB
					</div>
				</div>
			</main>
		</div>
	)
}

export default App
