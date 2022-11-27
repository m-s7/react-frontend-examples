import React from 'react'
import { ContentKey } from '@/business/types'
import { Counter } from '@/features/counter'
import { Memory } from '@/features/memory'

interface ContentProps {
	contentKey: ContentKey,
}

const contentList = Object.freeze({
	counter: <Counter />,
	memory: <Memory />
})

export const Content = (props: ContentProps) => {
	return (
		<>{contentList[props.contentKey]}</>
	)
}
