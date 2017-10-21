<template>
	<div>
		<!--navbar-->
		<b-navbar toggleable="md" type="dark" variant="info">
			<b-nav-toggle target="nav_collapse"></b-nav-toggle>
			<b-navbar-brand tag="router-link" to="/">WynnStats</b-navbar-brand>
			<b-collapse is-nav id="nav_collapse">
				<b-nav is-nav-bar>
					<b-nav-item to="/online">OnlinePlayers</b-nav-item>
					<dropdown text="LeaderBoard" nav>
						<b-dropdown-item to="/leaderboard/guild">Guild</b-dropdown-item>
						<b-dropdown-item to="/leaderboard/player">Player</b-dropdown-item>
						<b-dropdown-item to="/leaderboard/pvp">PVP</b-dropdown-item>
					</dropdown>
					<b-nav-item href="https://map.wynncraft.com/" target="_blank" rel="noopener noreferrer">Map</b-nav-item>
					<b-nav-item to="/about">About</b-nav-item>
				</b-nav>

				<b-nav is-nav-bar class="ml-auto">
					<dropdown v-if="loc!==null" :text="`${loc.name}(${loc.health}/${loc.maxHealth})`" nav :capitalize="false">
						<b-dropdown-item :to="`/player/${loc.name}`">Profile</b-dropdown-item>
						<b-dropdown-item :to="`/online?srv=${loc.server}`">Current Server</b-dropdown-item>
						<b-dropdown-item :href="`https://map.wynncraft.com/#/${loc.x}/${loc.y}/${loc.z}/min/0/0`" target="_blank" rel="noopener noreferrer">Current Location</b-dropdown-item>
						<b-dropdown-item @click="fetchPlayer">Refresh</b-dropdown-item>
					</dropdown>
					<!--right github link-->
					<b-nav-item href="https://github.com/maple3142/wynnstats" target="_blank" rel="noopener noreferrer">
						<i class="fa fa-github" aria-hidden="true"></i> GitHub
					</b-nav-item>
				</b-nav>
			</b-collapse>
		</b-navbar>

		<b-container fluid>
			<!--force render when path change-->
			<router-view :key="$route.path"></router-view>
		</b-container>
	</div>
</template>
<script>
import Dropdown from './vue/widget/Dropdown'
import BlankLink from './vue/widget/BlankLink'

import { getMyLocation } from '@/wynn'

export default {
	data() {
		return {
			dropdown: false,
			loc: null
		}
	},
	components: { Dropdown, BlankLink },
	methods: {
		async fetchPlayer(){
			let loc = await getMyLocation()
			this.loc = loc.error ? null : loc
			if(this.loc){
				this.loc.health=Math.floor(this.loc.health)
				this.loc.maxHealth=Math.floor(this.loc.maxHealth)
			}
		}
	},
	created() {
		setInterval(this.fetchPlayer.bind(this), 10 * 1000)
		this.fetchPlayer()
	}
}
</script>