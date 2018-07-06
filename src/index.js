//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'
import './style.css'

import 'whatwg-fetch'
import 'babel-polyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vuejsStorage from 'vuejs-storage/dist/vuejs-storage.js'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(vuejsStorage)

// vue router #anchor
Vue.mixin({
	mounted() {
		let hash,
			hs = location.hash.split('#')
		if (hs.length >= 2) {
			hash = hs.pop()
			try {
				let el = this.$el
				if (el !== null && el.querySelector && (el = el.querySelector(`#${hash}`))) {
					//if exists

					let bodyTop = document.body.getBoundingClientRect().top
					let elemTop = el.getBoundingClientRect().top

					setTimeout(() => {
						window.scrollTo(0, elemTop - bodyTop) //scroll to element
					}, 100)
				} else {
					window.scrollTo(0, 0)
				}
			} catch (e) {
				void 0 //empty statment for eslint
			}
		}
	}
})

// custom globals
Vue.filter('toHours', min => Math.round(min / 60))

// app
import App from './App'

const app = new Vue({
	el: '#app',
	router,
	render: h => h(App)
})

/* github pages spa polyfill
if ('rdr' in sessionStorage) {
	let rdr = sessionStorage.rdr
	delete sessionStorage.rdr
	app.$router.replace(rdr)
}
*/

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/service-worker.js')
		.then(reg => {
			reg.onupdatefound = () => {
				const installing = reg.installing
				installing.onstatechange = () => {
					if (installing.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							console.log('New content is available; please refresh.')
						} else {
							console.log('Content is cached for offline use.')
						}
					}
				}
			}
		})
		.catch(err => console.error('Service Worker register error:', err))
}
