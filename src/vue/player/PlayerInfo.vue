<template>
	<b-col>
		<b-list-group class="info">
			<b-list-group-item>
				<h3>
					<id :id="player.username">
						<span>{{ player.username }}</span>
					</id>
					<tag :tag="player.tag" :rank="player.rank" />
				</h3>
			</b-list-group-item>
			<b-list-group-item> Total Level: {{ totallv }} </b-list-group-item>
			<b-list-group-item> Total Playtime: {{ this.player.meta.playtime | toHours }} hours </b-list-group-item>
			<b-list-group-item> Joined: {{ joined }} </b-list-group-item>
			<b-list-group-item> Last Login: {{ lastlogin }} </b-list-group-item>
			<b-list-group-item
				v-if="player.guild.name !== 'None'"
				:to="`/guild/${player.guild.name}#${player.guild.rank.toLowerCase()}`"
			>
				{{ player.guild.rank | capitalize }} of
				<b-link :to="`/guild/${player.guild.name}`">{{ player.guild.name }}</b-link>
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
import Tag from '../widget/Tag'
import Id from '../widget/Id'
import { format } from 'date-fns'

export default {
	props: {
		player: Object
	},
	computed: {
		totallv() {
			return this.player.global.totalLevel.combat
		},
		joined() {
			return format(new Date(this.player.meta.firstJoin), 'yyyy/MM/dd')
		},
		lastlogin() {
			return format(new Date(this.player.meta.lastJoin), 'yyyy/MM/dd')
		}
	},
	components: { Tag, Id }
}
</script>
