const ls = localStorage
export class CacheStorage {
	constructor(
		{
			expire = 10 * 60 * 1000 //10min
		} = {}
	) {
		this.expire = expire
	}

	has(key) {
		let item
		if (ls.getItem(key) == null) {
			return false
		}
		item = JSON.parse(ls.getItem(key))
		if (Date.now() - item.time > this.expire) {
			ls.removeItem(key)
			return false
		}
		return true
	}

	set(key, value) {
		ls.setItem(key, JSON.stringify({ time: Date.now(), value }))
	}

	get(key) {
		if (this.hasItem(key)) {
			return JSON.parse(ls.getItem(key)).value
		}
		return null
	}
}

export default expire => new CacheStorage({ expire })
