type ThrottleReturnType<T extends Array<unknown>> = (...args: T) => void

export const throttle = <T extends Array<unknown>>(fn: ThrottleReturnType<T>, timeout = 0): ThrottleReturnType<T> => {
	let isThrottled = false

	return (...args: T) => {
		if(!isThrottled) {
			isThrottled = true
			fn(...args)
			setTimeout(() => { isThrottled = false }, timeout)
		}
	}
}

const throttled = throttle<[string, number]>((name, age) => {
	console.log(`Debounced by ${name}, age: ${age}`)
})

throttled('John', 36)
