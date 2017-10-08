<template>
	<div>
		<b-row class="justify-content-md-center pb-2">
			<b-col md="10">

				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Player {{id}} not found</b-alert>

				<!--top-->
				<b-row class="pb-2">
					<!--left-->
					<b-col class="text-center">
						<!--skin-->
						<b-row>
							<b-col>
								<b-img :src="`https://visage.surgeplay.com/bust/350/${id}.png`" v-show="user && !user.error" :alt="`${id} skin`" />
							</b-col>
						</b-row>
					</b-col>
					<!--right-->
					<b-col v-if="user && !user.error" class="text-center">
						<!--information-->
						<b-row>
							<userinfo :user="user" class="p-2" />
						</b-row>
						<b-row>
							<b-col>
								<a :href="`https://wynncraft.com/stats/player/${id}`" target="_blank" rel="noopener">Official Stats</a>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<b-button variant="danger" @click="clear" v-b-tooltip.hover title="WynnStats will cache data for 10min by default.">Clear {{this.id}} cache</b-button>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
				<!--middle-->
				<b-row v-if="user && !user.error" class="text-center">
					<ranking :rankings="user.rankings"></ranking>
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
import ranking from './user/ranking'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import cache from '@/cache'
import { getPlayerStats } from '@/wynn'

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
			try {
				this.user = await getPlayerStats(this.id)
				cache.set(id, this.user)
			}
			catch (e) {
				this.error = true
			}
		}
		this.loading = false

	},
	components: { userinfo, classes, PulseLoader, ranking },
	methods: {
		clear() {
			cache.remove(this.id)
			this.$router.go(0)
		}
	}
}
</script>