import React from 'react'

interface CardProps {
	css?: string,
}

export const Card = (props: React.PropsWithChildren<CardProps>) => {
	const { css = '', children } = props

	return (
		<div className={`bg-zinc-50 m-1 p-5 w-min rounded-xl border-zinc-200 border shadow ${css}`}>
			{children}
		</div>
	)
}
