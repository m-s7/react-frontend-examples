import React, {useState} from 'react'
import '@/app.css'
import { MenuLink } from '@/components'
import { Content } from '@/components'
import { ContentKey } from '@/business/types'

export const App = () => {
	const [contentKey, setContentKey] = useState<ContentKey>('counter')

	return (
		<div className="main-layout">
			<div className="w-72 overflow-y-auto overflow-x-hidden bg-zinc-700 flex flex-col justify-between">
				<div>
					<div className="text-gray-200 header">
						<h2 className="text-4xl p-5 pl-10 border-b border-zinc-600">React FE</h2>
					</div>
					<menu className="text-xl pl-5 pt-5 pr-5">
						<ul>
							<MenuLink text="Memory" onClick={() => { setContentKey('memory') }} />
							<MenuLink text="Counter" onClick={() => { setContentKey('counter') }} />
						</ul>
					</menu>
				</div>
				<div className="pl-4 pb-1 pr-4 text-zinc-400 text-xs flex justify-between">
					<p>Made with <span className="text-rose-600">♥</span> in <a href="#">Rumia</a></p>
					<p>v0.0.1</p>
				</div>
			</div>
			<main className="p-10 bg-slate-100">
				<h1 className="text-base text-zinc-500 uppercase">{contentKey}</h1>
				<div className="w-full p-2">
					<Content contentKey={contentKey} />
				</div>
			</main>
		</div>
	)
}

export default App
