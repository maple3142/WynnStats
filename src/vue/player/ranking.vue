<template>
	<b-col>
		<b-list-group class="hl">
			<b-list-group-item v-if="rankings.player">
				Level Rank: #{{rankings.player}}
			</b-list-group-item>
			<b-list-group-item v-if="rankings.pvp">
				PVP Rank: #{{rankings.pvp}}
			</b-list-group-item>
			<b-list-group-item v-if="rankings.guild">
				Guild Rank: #{{rankings.guild}}
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
export default {
	props: ['rankings']
}
</script>
