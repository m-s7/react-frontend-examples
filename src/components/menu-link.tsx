import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons'

interface MenuLinkProps {
    text?: string,
	onClick: () => void,
}

export const MenuLink = (props: React.PropsWithChildren<MenuLinkProps>) => {
	const { onClick, text, children } = props

	return (
		<li className="p-3 text-zinc-100 hover:bg-zinc-500 hover:rounded-md hover:cursor-pointer" onClick={onClick}>
			<p>
				<FontAwesomeIcon icon={faFontAwesome} className="text-zinc-50 text-xl mr-2" />
				{text ?? children}
			</p>
		</li>
	)
}
