<template>
	<div>
		<!--top-->
		<b-row>
			<!--left-->
			<b-col>
				<!--skin-->
				<b-row class="text-center">
					<b-col>
						<b-img :src="`https://visage.surgeplay.com/bust/350/${id}.png`" />
					</b-col>
				</b-row>
			</b-col>
			<!--right-->
			<b-col v-if="user && !user.error">
				<!--information-->
				<userinfo :user="user" class="p-2"/>
				<b-row class="text-center">
					<b-col>
						<a :href="`https://wynncraft.com/stats/player/${id}`" target="_blank">Official Stats</a>
					</b-col>
				</b-row>
				<b-row class="text-center">
					<b-col>
						<b-button variant="danger" @click="clear" v-b-tooltip.hover title="WynnStats will cache data for 10min by default.">Clear {{this.id}} cache</b-button>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<!--bottom-->
		<b-row v-if="user && !user.error">
			<classes :classes="user.classes" class="p-2"></classes>
		</b-row>
	</div>
</template>
<script>
import userinfo from './user/userinfo'
import classes from './user/classes'

import cache from '@/cache'

export default {
	data() {
		return {
			id: this.$route.params.id,
			user: null
		}
	},
	async created() {
		let id = this.id.trim()

		if (cache.has(id)) {
			this.user = cache.get(id)
		}
		else {
			//fetch user data, api provided by runkit, source: https://runkit.com/maple3142/wynncraft-stats
			let url = `https://api.wynncraft.com/public_api.php?action=playerStats&command=${id}`
			try {
				this.user = await fetch(url).then(r => r.json())
				cache.set(id,this.user)
			}
			catch (e) {
				alert(e.message)
			}
		}

	},
	components: { userinfo, classes },
	methods: {
		clear() {
			cache.remove(this.id)
			this.$router.go(0)
		}
	}
}
</script>