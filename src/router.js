import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import home from './vue/home'
import user from './vue/user'

const routes = [
	{ path: '/', component: home },
	{ path: '/:id', component: user }
]

const router = new VueRouter({ routes })

export default router