<template>
	<b-col>
		<b-list-group class="info">
			<b-list-group-item>
				<h3>{{player.username}}
					<span v-if="tag" :class="tag">{{tag | format}}</span>
				</h3>
			</b-list-group-item>
			<b-list-group-item>
				Total Level: {{totallv}}
			</b-list-group-item>
			<b-list-group-item>
				Total Playtime: {{totalplaytime}} hours
			</b-list-group-item>
			<b-list-group-item>
				Joined: {{joined}}
			</b-list-group-item>
			<b-list-group-item>
				Last Login: {{lastlogin}}
			</b-list-group-item>
			<b-list-group-item v-if="player.guild.name!=='None'">
				{{player.guild.rank}} of
				<router-link :to="`/guild/${player.guild.name}`">{{player.guild.name}}</router-link>
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
export default {
	props: ['player'],
	computed: {
		totallv() {
			let lv = 0
			for (let cls of Object.values(this.player.classes)) {
				lv += cls.level
			}
			return lv
		},
		totalplaytime() {
			return Math.floor(this.player.playtime / 60)
		},
		joined() {
			return this.player.first_join_friendly
		},
		lastlogin() {
			return this.player.last_join_friendly
		},
		tag() {
			if (this.player.rank === 'Moderator') {
				return 'MODERATOR'
			}
			if (this.player.rank === 'Builder') {
				return 'BUILDER'
			}
			if (this.player.rank === 'Game Master') {
				return 'GAME_MASTER'
			}
			if (this.player.tag === 'VIP+') {
				return 'VIP_PLUS'
			}
			return this.player.tag
		}
	},
	filters: {
		format(tag) {
			if (tag === 'VIP_PLUS') {
				return 'VIP+'
			}
			return tag
		}
	}
}
</script>
<style scoped>
.HERO {
	color: #AA00AA;
}

.VIP_PLUS {
	color: #00C3FF;
}

.VIP {
	color: #48F147;
}

.MODERATOR {
	color: #F9C700;
}

.BUILDER,
.GAME_MASTER {
	color: #0099C7;
}
</style>
