<template>
	<div>
		<b-row>
			<!--left-->
			<b-col>
				<b-row class="text-center">
					<b-col>
						<b-img :src="`https://visage.surgeplay.com/bust/350/${id}.png`" />
					</b-col>
				</b-row>
			</b-col>
			<b-col v-if="user && !user.error">
				<userinfo :user="user" />
				<b-row class="text-center">
					<b-col>
						<a :href="`https://wynncraft.com/stats/player/${id}`" target="_blank">Official Stats</a>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row v-if="user && !user.error">
			<classes :classes="user.classes" class="p-2"></classes>
		</b-row>
	</div>
</template>
<script>
import userinfo from './user/userinfo'
import classes from './user/classes'
export default {
	data() {
		return {
			id: this.$route.params.id,
			user: null
		}
	},
	beforeRouteUpdate(to, from, next) {
		this.id = to.params.id
		next()
		this.init()
	},
	methods: {
		init: async function() {

			//fetch user data
			let url = `https://wynncraft-stats-r8xzkwk4zuht.runkit.sh/${this.id}`
			try {
				this.user = await fetch(url).then(r => r.json())
			}
			catch (e) {
				alert(e.message)
			}
		}
	},
	created() {
		this.init()
	},
	components: { userinfo,classes }
}
</script>