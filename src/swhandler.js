self.addEventListener('fetch', e => {
	e.respondWith(fetch(e.request).then(res => {
		return caches.open(e.request.url).then(cache => {
			cache.put(e.request.url, res.clone())
			return res
		})
	}).catch(err => {
		return caches.match(e.request.url)
	}))

})