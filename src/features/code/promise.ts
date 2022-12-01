type Status = 'pending' | 'fulfilled' | 'rejected'
type FulfilledFunction<T> = (value: T) => void
type RejectedFunction = (error: unknown) => void
type Handler<T> = (resolve: FulfilledFunction<T>, reject: RejectedFunction) => void

export class MyPromise<T> {
	private error: unknown
	private value: T | undefined
	private status: Status = 'pending'
	private onFulfilledCallbacks: Array<FulfilledFunction<T>> = []
	private onRejectedCallbacks: Array<RejectedFunction> = []

	static all(promises: Array<MyPromise<any>>): MyPromise<unknown> {
		const results: Array<unknown> = []
		let count = 0

		return new MyPromise((resolve, reject) => {
			promises.forEach((promise, index) => {
				promise
					.then(res => {
						results[index] = res
						count++
						if(count === promises.length) {
							resolve(results)
						}
					})
					.catch(err => {
						reject(err)
					})
			})
		})
	}

	constructor(handler: Handler<T>) {
		const resolve = (value: T): void => {
			if (this.status === 'pending') {
				this.status = 'fulfilled'
				this.value = value

				this.onFulfilledCallbacks.forEach(fn => fn(value))
			}
		}

		const reject = (error: unknown): void => {
			if (this.status === 'pending') {
				this.status = 'rejected'
				this.error = error

				this.onRejectedCallbacks.forEach(fn => fn(error))
			}
		}

		try {
			handler(resolve, reject)
		} catch (err: unknown) {
			reject(err)
		}
	}

	then(onFulfilled: FulfilledFunction<unknown>): MyPromise<T> {
		if (this.status === 'pending') this.onFulfilledCallbacks.push(onFulfilled)
		else if (this.status === 'fulfilled') onFulfilled(this.value)

		return this
	}

	catch(onRejected: RejectedFunction): MyPromise<T> {
		if (this.status === 'pending') this.onRejectedCallbacks.push(onRejected)
		else if (this.status === 'rejected') onRejected(this.error)

		return this
	}
}

const p1 = new MyPromise<string>((resolve, reject) => {
	setTimeout(() => { resolve('resolved 1') }, 1000)
})

const p2 = new MyPromise((resolve, reject) => {
	setTimeout(() => { reject('rejected 1') }, 1500)
})
