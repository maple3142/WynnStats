<template>
	<b-col>
		<b-list-group class="info">
			<b-list-group-item>
				<h3>{{user.username}}</h3>
			</b-list-group-item>
			<b-list-group-item>
				Total Lv: {{totallv}}
			</b-list-group-item>
			<b-list-group-item>
				Total Playtime: {{totalplaytime}}
			</b-list-group-item>
			<b-list-group-item>
				Joined: {{joined}}
			</b-list-group-item>
			<b-list-group-item>
				Last Login: {{lastlogin}}
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
export default {
	props: ['user'],
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