//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vuejsStorage from 'vuejs-storage'
Vue.use(BootstrapVue)
Vue.use(vuejsStorage)

import App from './App'
import router from './router'

new Vue({
	el: '#app',
	components: { App },
	router
})