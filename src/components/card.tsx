import React from 'react'

interface CardProps {
    classes?: string,
}

export const Card = (props: React.PropsWithChildren<CardProps>) => {
	const { classes = '', children } = props

	return (
		<div className={`bg-zinc-50 m-1 p-5 w-min rounded-xl border-zinc-200 border shadow ${classes}`}>
			{children}
		</div>
	)
}
