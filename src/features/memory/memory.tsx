import React, {useEffect, useLayoutEffect, useState} from 'react'
import '@/app.css'
import './memory.css'
import { Tile } from '@/features/memory/components'
import { Card } from '@/components'

export type Size = 2 | 4 | 6

interface Revealed {
	state: boolean,
	permanent: boolean,
}

const generateGrid = (size: Size): number[][] => {
	const grid: number[][] = []

	const usedNumbers: number[] = []
	for(let i = 0; i < size; i++) {
		grid.push([])
		for(let j = 0; j < size; j++) {
			const max = (size * (size/2))
			let num = Math.floor(Math.random() * max)
			while(usedNumbers.filter(usedNumber => usedNumber === num).length === 2) {
				num = Math.floor(Math.random() * max)
			}

			grid[i][j] = num
			usedNumbers.push(num)
		}
	}

	return grid
}

const generateRevealedGrid = (size: Size): Revealed[][] => {
	const revealed: Revealed[][] = []
	for(let i = 0; i < size; i++) {
		revealed.push([])
		for(let j = 0; j < size; j++) {
			revealed[i].push({ state: false, permanent: false })
		}
	}

	return revealed
}

export const Memory = () => {
	const [size, setSize] = useState<Size>(4)
	const [counter, setCounter] = useState(0)
	const [grid, setGrid] = useState<number[][]>([])
	const [revealedGrid, setRevealedGrid] = useState<Revealed[][]>([])

	useLayoutEffect(() => {
		setGrid(generateGrid(size))
		setRevealedGrid(generateRevealedGrid(size))
	}, [])

	const reset = (overrideSize?: Size): void => {
		const newSize = (overrideSize ?? size)

		setRevealedGrid(generateRevealedGrid(newSize))
		setGrid(generateGrid(newSize))
		setCounter(0)
	}

	const getRevealedList = (overrideRevealedGrid?: Revealed[][]): { row: number, col: number }[] | [] => {
		const result = []
		const grid = (overrideRevealedGrid ?? revealedGrid)

		for(let i = 0; i < grid.length; i++) {
			for(let j = 0; j < grid[i].length; j++) {
				const entry = grid[i][j]
				if(entry.state && !entry.permanent) result.push({ row: i, col: j })
			}

			if(result.length === 2) break
		}

		return result
	}

	const handleClick = async (rowIndex: number, colIndex: number) => {
		const revealedList = getRevealedList()

		switch(revealedList.length) {
			case 0: {
				const copy = [...revealedGrid]
				copy[rowIndex][colIndex].state = true
				setRevealedGrid(copy)

				setCounter(counter => counter+1)
				break
			}
			case 1: {
				const copy = [...revealedGrid]
				copy[rowIndex][colIndex].state = true
				setRevealedGrid(copy)

				const revealedList = getRevealedList(copy)
				const value1 = revealedList[0]
				const value2 = revealedList[1]
				if(grid[value1.row][value1.col] === grid[value2.row][value2.col]) {
					copy[value1.row][value1.col].permanent = true
					copy[value2.row][value2.col].permanent = true

					setRevealedGrid(copy)
				}
				else {
					setTimeout(() => {
						const copy = [...revealedGrid]
						getRevealedList().forEach(revealed => {
							copy[revealed.row][revealed.col].state = false
						})

						setRevealedGrid(copy)
					}, 500)
				}

				setCounter(counter => counter+1)
				break
			}
		}
	}

	const SizeButton = (props: { sizeKey: Size }) => {
		const { sizeKey } = props

		return (
			<button
				className={`memory-button ${sizeKey === size ? 'selected' : ''}`}
				onClick={() => {
					setSize(sizeKey)
					reset(sizeKey)
				}}>
				Size {sizeKey}
			</button>)
	}

	return (
		<Card css="w-1/2">
			<div className="flex justify-between pb-10">
				<SizeButton sizeKey={2} />
				<SizeButton sizeKey={4} />
				<SizeButton sizeKey={6} />
			</div>
			<div className={`grid grid-${size} gap-1.5`}>
				{grid.map((row, rowIndex) => (
					row.map((num, colIndex) => (
						<Tile
							key={`${rowIndex}-${colIndex}`}
							num={num}
							row={rowIndex}
							col={colIndex}
							isRevealed={revealedGrid[rowIndex][colIndex].state}
							onClick={handleClick} />
					))
				))}
			</div>
			<div className="pt-5 pl-2 text-zinc-500">Clicks: {counter}</div>
			<div className="flex justify-center pt-5">
				<button className="memory-button" onClick={() => { reset() }}>Reset</button>
			</div>
		</Card>
	)
}
