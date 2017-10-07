class Cache {
	constructor({
		storage = window.localStorage,
		expire = 10 * 60 * 1000, //10min
		namespace = 'cache'
	} = {}) {
		this.storage = storage
		this.expire = expire
		this.namespace = namespace
		this.data = {}

		let item = this.storage.getItem(this.namespace)
		if (item !== null) {
			try {
				this.data = JSON.parse(item)
			}
			catch (e) {
				//json not vaild
				this.clear()
			}
		}
	}

	has(key) {
		if (!(key in this.data)) {
			return false
		}
		let i = this.data[key]
		//item expired
		if (Date.now() - i.time > this.expire) {
			delete this.data[key]
			return false
		}
		return true
	}

	set(key, value) {
		value = JSON.stringify(value)
		this.data[key] = { time: Date.now(), value }

		this.storage.setItem(this.namespace,JSON.stringify(this.data))
	}

	get(key) {
		if (this.has(key)) {
			return JSON.parse(this.data[key].value)
		}
		return null
	}

	remove(key) {
		delete this.data[key]

		this.storage.setItem(this.namespace,JSON.stringify(this.data))
	}

	clear() {
		this.data = {}
		
		this.storage.removeItem(this.namespace)
	}

}

export default new Cache()