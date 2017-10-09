<template>
	<div>
		<!--navbar-->
		<b-navbar toggleable="md" type="dark" variant="info">
			<b-nav-toggle target="nav_collapse"></b-nav-toggle>
			<b-navbar-brand tag="router-link" to="/">WynnStats</b-navbar-brand>
			<b-collapse is-nav id="nav_collapse">
				<b-nav is-nav-bar>
					<b-nav-item to="/online">OnlinePlayers</b-nav-item>
					<Dropdown text="LeaderBoard" nav>
						<b-dropdown-item to="/leaderboard/guild">Guild</b-dropdown-item>
						<b-dropdown-item to="/leaderboard/player">Player</b-dropdown-item>
						<b-dropdown-item to="/leaderboard/pvp">PVP</b-dropdown-item>
					</Dropdown>
				</b-nav>

				<b-nav is-nav-bar class="ml-auto">
					<!--right github link-->
					<b-nav-item href="https://github.com/maple3142/wynnstats" target="_blank">
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
export default {
	data() {
		return {
			dropdown: false
		}
	},
	components: { Dropdown }
}
</script>