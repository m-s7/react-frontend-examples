import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface TileProps {
    num: number,
    row: number,
    col: number,
    isRevealed: boolean,
    onClick: (row: number, col: number) => void,
}

export const Tile = (props: TileProps) => {
	const { num, row, col, isRevealed, onClick } = props

	return (
		<div
			className={`bg-sky-400 text-center p-10 cursor-pointer text-3xl text-zinc-50 ${isRevealed ? 'bg-green-400' : ''}`}
			onClick={() => {
				if(isRevealed) return

				onClick(row, col)
			}}>
			{isRevealed ? num : <FontAwesomeIcon icon={faXmark} />}
		</div>
	)
}
