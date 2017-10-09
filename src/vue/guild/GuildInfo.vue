<template>
	<b-col>
		<b-list-group class="info">
			<b-list-group-item>
				<h3>{{guild.name}}[{{guild.prefix}}]</h3>
			</b-list-group-item>
			<b-list-group-item>
				Members: {{guild.members.length}}
			</b-list-group-item>
			<b-list-group-item>
				Level: {{guild.level}}
			</b-list-group-item>
			<b-list-group-item>
				Territories: {{guild.territories}}
			</b-list-group-item>
			<b-list-group-item>
				Created: {{guild.createdFriendly}}
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
export default {
	props: {
		guild: Object
	},
	computed: {
		totallv() {
			let lv = 0
			for (let cls of Object.values(this.user.classes)) {
				lv += cls.level
			}
			return lv
		},
		totalplaytime() {
			return Math.floor(this.user.playtime / 60)
		},
		joined() {
			return this.user.first_join_friendly
		},
		lastlogin() {
			return this.user.last_join_friendly
		}
	}
}
</script>