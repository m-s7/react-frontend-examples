export const getElementsByCN = (className: string) => {
	const nodes: Array<HTMLElement> = []

	function crawl(node: HTMLElement) {
		if (node.classList && node.classList.value.indexOf(className) > -1)
			nodes.push(node)

		node.childNodes.forEach(child => {
			crawl(child as HTMLElement)
		})
	}

	crawl(document.body)

	return nodes
}
