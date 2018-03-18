import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = import(/* webpackChunkName: "Home" */ '@/vue/Home').then(x=>x.default)
const Player = import(/* webpackChunkName: "Player" */ '@/vue/Player').then(x=>x.default)
const Guild = import(/* webpackChunkName: "Guild" */ '@/vue/Guild').then(x=>x.default)
const LeaderBoard = import(/* webpackChunkName: "LeaderBoard" */ '@/vue/LeaderBoard').then(x=>x.default)
const Search = import(/* webpackChunkName: "Search" */ '@/vue/Search').then(x=>x.default)
const OnlinePlayers = import(/* webpackChunkName: "OnlinePlayers" */ '@/vue/OnlinePlayers').then(x=>x.default)
const Item = import(/* webpackChunkName: "Item" */ '@/vue/Item').then(x=>x.default)
const About = import(/* webpackChunkName: "About" */ '@/vue/About').then(x=>x.default)

const routes = [
	{ path: '/', component: Home },
	{ path: '/player/:id', component: Player },
	{ path: '/guild/:name', component: Guild },
	{ path: '/leaderboard/:type(player|guild|pvp)', component: LeaderBoard },
	{ path: '/search/:search', component: Search },
	{ path: '/online', component: OnlinePlayers },
	{ path: '/item', component: Item },
	{ path: '/item/:name', component: Item },
	{ path: '/about', component: About }
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

export default router