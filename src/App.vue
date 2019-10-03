<template>
	<div>
		<!--navbar-->
		<b-navbar toggleable="md" type="dark" variant="info">
			<b-nav-toggle target="nav_collapse"></b-nav-toggle>
			<b-navbar-brand tag="router-link" to="/">WynnStats</b-navbar-brand>
			<b-collapse is-nav id="nav_collapse">
				<b-navbar-nav>
					<b-nav-item to="/online">OnlinePlayers</b-nav-item>
					<b-nav-item-dropdown text="LeaderBoard" :class="{ show: $route.path.startsWith('/leaderboard') }">
						<!--the "show" class here means "active" for that internal a link-->
						<b-dropdown-item to="/leaderboard/guild">Guild</b-dropdown-item>
						<b-dropdown-item to="/leaderboard/player">Player</b-dropdown-item>
						<b-dropdown-item to="/leaderboard/pvp">PVP</b-dropdown-item>
					</b-nav-item-dropdown>
					<b-nav-item to="/item">ItemDB</b-nav-item>
					<b-nav-item href="https://map.wynncraft.com/" target="_blank" rel="noopener noreferrer"
						>Map</b-nav-item
					>
					<b-nav-item to="/about">About</b-nav-item>
				</b-navbar-nav>

				<b-navbar-nav class="ml-auto">
					<!--right github link-->
					<b-nav-item href="https://github.com/maple3142/wynnstats" target="_blank" rel="noopener noreferrer">
						<i class="fa fa-github" aria-hidden="true"></i> GitHub
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>

		<b-container fluid>
			<!--force render when path change-->
			<router-view :key="$route.path"></router-view>
		</b-container>
	</div>
</template>
<script>
import BlankLink from './vue/widget/BlankLink'

export default {
	data() {
		return {
			dropdown: false
		}
	},
	components: { BlankLink }
}
</script>
