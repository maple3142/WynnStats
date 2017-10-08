import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import home from './vue/home'
import player from './vue/player'
import guild from './vue/guild'
import leaderboard from './vue/leaderboard'

const routes = [
	{ path: '/', component: home },
	{ path: '/player/:id', component: player },
	{ path: '/guild/:name', component: guild },
	{ path: '/leaderboard/:type(player|guild|pvp)', component: leaderboard }
]

const router = new VueRouter({ routes })

export default router