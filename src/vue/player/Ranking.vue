<template>
	<b-col class="p-2">
		<b-list-group class="hl">
			<b-list-group-item v-if="rankings.player" to="/leaderboard/player">
				Level Rank: #{{ rankings.player }}
			</b-list-group-item>
			<b-list-group-item v-if="rankings.pvp" to="/leaderboard/pvp">
				PVP Rank: #{{ rankings.pvp }}
			</b-list-group-item>
			<b-list-group-item v-if="rankings.guild" to="/leaderboard/guild">
				Guild Rank: #{{ rankings.guild }}
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
export default {
	props: {
		rankings: Object
	}
}
</script>
