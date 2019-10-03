import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const resolveDefault = x => x.default

const Home = () => import(/* webpackChunkName: "Home" */ '@/vue/Home').then(resolveDefault)
const Player = () => import(/* webpackChunkName: "Player" */ '@/vue/Player').then(resolveDefault)
const Guild = () => import(/* webpackChunkName: "Guild" */ '@/vue/Guild').then(resolveDefault)
const LeaderBoard = () => import(/* webpackChunkName: "LeaderBoard" */ '@/vue/LeaderBoard').then(resolveDefault)
const Search = () => import(/* webpackChunkName: "Search" */ '@/vue/Search').then(resolveDefault)
const OnlinePlayers = () => import(/* webpackChunkName: "OnlinePlayers" */ '@/vue/OnlinePlayers').then(resolveDefault)
const ItemList = () => import(/* webpackChunkName: "ItemList" */ '@/vue/ItemList').then(resolveDefault)
const Item = () => import(/* webpackChunkName: "Item" */ '@/vue/Item').then(resolveDefault)
const About = () => import(/* webpackChunkName: "About" */ '@/vue/About').then(resolveDefault)

const routes = [
	{ path: '/', component: Home },
	{ path: '/player/:id', component: Player },
	{ path: '/guild/:name', component: Guild },
	{ path: '/leaderboard/:type(player|guild|pvp)', component: LeaderBoard },
	{ path: '/search/:search', component: Search },
	{ path: '/online', component: OnlinePlayers },
	{ path: '/item', component: ItemList },
	{ path: '/item/:name', component: Item },
	{ path: '/about', component: About }
]

const router = new VueRouter({
	routes,
	mode: 'history',
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'
})

export default router
