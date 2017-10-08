<template>
	<div>
		<!--navbar-->
		<b-navbar toggleable="md" type="dark" variant="info">
			<b-nav-toggle target="nav_collapse"></b-nav-toggle>
			<b-navbar-brand tag="router-link" to="/">WynnStats</b-navbar-brand>
			<b-collapse is-nav id="nav_collapse">
				<b-nav is-nav-bar>
					<b-nav-item-dropdown text="LeaderBoard">
						<b-dropdown-item tag="router-link" to="/leaderboard/guild">Guild</b-dropdown-item>
						<b-dropdown-item tag="router-link" to="/leaderboard/player">Player</b-dropdown-item>
						<b-dropdown-item tag="router-link" to="/leaderboard/pvp">PVP</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-nav>

				<b-nav is-nav-bar class="ml-auto">
					<!--right github link-->
					<b-nav-item href="https://github.com/maple3142/wynnstats" target="_blank">
						<div class="inline-container">
							<div class="inline img">
								<b-img :src="require('@/assets/github.svg')" fluid/>
							</div>
							<div class="inline">
								GitHub
							</div>
						</div>
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
<style scoped>
.inline-container {
	white-space: nowrap
}

.inline {
	display: inline;
}

.inline>img {
	height: 25px;
}
</style>