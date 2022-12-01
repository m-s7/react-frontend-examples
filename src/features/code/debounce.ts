type DebounceReturnType<T extends Array<unknown>> = (...args: T) => unknown

export const debounce = <T extends Array<unknown>>(fn: DebounceReturnType<T>, timeout = 0): DebounceReturnType<T> => {
	let timeoutId: number

	return (...args: T) => {
		clearTimeout(timeoutId)
		timeoutId = window.setTimeout(() => { fn(...args) }, timeout)
	}
}

const debounced = debounce<[string, number]>((name, age) => {
	console.log(`Debounced by ${name}, age: ${age}`)
}, 1000)

debounced('John', 36)
