//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'
import './style.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vuejsStorage from 'vuejs-storage'
import router from './router'

//bootstrap-vue polyfill
let originalVueComponent = Vue.component
Vue.component = function (name, definition) {
	if (name === 'bFormCheckboxGroup' || name === 'bCheckboxGroup' ||
		name === 'bCheckGroup' || name === 'bFormRadioGroup') {
		definition.components = { bFormCheckbox: definition.components[0] }
	}
	originalVueComponent.apply(this, [name, definition])
}
Vue.use(BootstrapVue)
Vue.component = originalVueComponent

Vue.use(vuejsStorage)


// vue router #anchor
Vue.mixin({
	mounted() {
		let hash, hs = location.hash.split('#')
		if (hs.length >= 2) {
			hash = hs.pop()
			try {
				let el = this.$el
				if (el !== null && el.querySelector && (el = el.querySelector(`#${hash}`))) { //if exists


					let bodyTop = document.body.getBoundingClientRect().top
					let elemTop = el.getBoundingClientRect().top

					setTimeout(() => {
						window.scrollTo(0, elemTop - bodyTop) //scroll to element
					}, 100)
				}
				else {
					window.scrollTo(0, 0)
				}
			}
			catch (e) {
				void (0) //empty statment for eslint
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

// github pages spa polyfill
if ('rdr' in sessionStorage) {
	let rdr = sessionStorage.rdr
	delete sessionStorage.rdr
	app.$router.replace(rdr)
}




import OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()