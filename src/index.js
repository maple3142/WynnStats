//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'
import './style.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vuejsStorage from 'vuejs-storage'

import router from './router'

Vue.use(BootstrapVue)
Vue.use(vuejsStorage)

import app from './app'

Vue.filter('toHours', min => Math.round(min / 60))

new Vue({
	el: '#app',
	components: { app },
	router
})