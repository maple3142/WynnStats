<template>
	<b-col>
		<b-list-group class="info">
			<b-list-group-item>
				<h3>
					<b-img-lazy fluid :src="`https://crafatar.com/avatars/${player.username}?size=20`" :rel="`${player.username}'s head`" /> {{player.username}}
					<Tag :tag="player.tag" :rank="player.rank"/>
				</h3>
			</b-list-group-item>
			<b-list-group-item>
				Total Level: {{totallv}}
			</b-list-group-item>
			<b-list-group-item>
				Total Playtime: {{this.player.playtime | toHours}} hours
			</b-list-group-item>
			<b-list-group-item>
				Joined: {{joined}}
			</b-list-group-item>
			<b-list-group-item>
				Last Login: {{lastlogin}}
			</b-list-group-item>
			<b-list-group-item v-if="player.guild.name!=='None'">
				{{player.guild.rank}} of
				<b-link :to="`/guild/${player.guild.name}`">{{player.guild.name}}</b-link>
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
import Tag from '../widget/Tag'
export default {
	props: {
		player: Object
	},
	computed: {
		totallv() {
			let lv = 0
			for (let cls of Object.values(this.player.classes)) {
				lv += cls.level
			}
			return lv
		},
		joined() {
			return this.player.first_join_friendly
		},
		lastlogin() {
			return this.player.last_join_friendly
		}
	},
	components: { Tag }
}
</script>