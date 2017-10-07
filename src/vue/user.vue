<template>
	<div>
		<b-row class="justify-content-md-center pb-2">
			<b-col md="10">

				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Player {{id}} not found</b-alert>

				<!--top-->
				<b-row class="pb-2">
					<!--left-->
					<b-col>
						<!--skin-->
						<b-row class="text-center">
							<b-col>
								<b-img :src="`https://visage.surgeplay.com/bust/350/${id}.png`" v-show="user && !user.error" />
							</b-col>
						</b-row>
					</b-col>
					<!--right-->
					<b-col v-if="user && !user.error">
						<!--information-->
						<userinfo :user="user" class="p-2" />
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
				<!--middle-->
				<b-row v-if="user && !user.error">
					<b-col>
						<b-list-group class="hl text-center">
							<b-list-group-item v-if="user.rankings.player">
								Level Rank: #{{user.rankings.player}}
							</b-list-group-item>
							<b-list-group-item v-if="user.rankings.pvp">
								PVP Rank: #{{user.rankings.pvp}}
							</b-list-group-item>
							<b-list-group-item v-if="user.rankings.guild">
								Guild Rank: #{{user.rankings.guild}}
							</b-list-group-item>
						</b-list-group>
					</b-col>
				</b-row>
				<!--bottom-->
				<b-row v-if="user && !user.error">
					<classes :classes="user.classes" class="p-2"></classes>
				</b-row>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import userinfo from './user/userinfo'
import classes from './user/classes'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import cache from '@/cache'

export default {
	data() {
		return {
			id: this.$route.params.id,
			user: null,
			error: false,
			loading: true
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
				if (this.user.error) {
					throw new Error(`Player ${id} not found`)
				}
				cache.set(id, this.user)
			}
			catch (e) {
				this.error = true
			}
		}
		this.loading = false

	},
	components: { userinfo, classes, PulseLoader },
	methods: {
		clear() {
			cache.remove(this.id)
			this.$router.go(0)
		}
	}
}
</script>