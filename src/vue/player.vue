<template>
	<div>
		<b-row class="justify-content-md-center pb-2">
			<b-col md="8">
				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Player {{id}} not found.</b-alert>

				<!--top-->
				<b-row class="pb-2">
					<!--left-->
					<b-col class="text-center">
						<!--skin-->
						<b-row>
							<b-col>
								<b-img :src="`https://visage.surgeplay.com/bust/350/${id}.png`" v-show="player" :alt="`${id} skin`" />
							</b-col>
						</b-row>
					</b-col>
					<!--right-->
					<b-col v-if="player" class="text-center">
						<!--information-->
						<b-row>
							<playerinfo :player="player" class="p-2" />
						</b-row>
						<b-row>
							<b-col>
								<a :href="`https://wynncraft.com/stats/player/${id}`" target="_blank" rel="noopener">Official Stats</a>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<b-button variant="danger" @click="clear" v-b-tooltip.hover title="WynnStats will cache data for 10min by default.">Force refresh</b-button>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
				<!--middle-->
				<b-row v-if="player" class="text-center">
					<ranking :rankings="player.rankings"></ranking>
				</b-row>
				<!--bottom-->
				<b-row v-if="player">
					<classes :classes="player.classes" class="p-2"></classes>
				</b-row>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import playerinfo from './player/playerinfo'
import classes from './player/classes'
import ranking from './player/ranking'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import { Cache } from '@/cache'
const cache = new Cache({ namespace: 'player-cache' })
import { getPlayerStats } from '@/wynn'


export default {
	data() {
		return {
			id: this.$route.params.id,
			player: null,
			error: false,
			loading: true
		}
	},
	async created() {
		let id = this.id.trim()

		if (cache.has(id)) {
			this.player = cache.get(id)
		}
		else {
			try {
				this.player = await getPlayerStats(id)
				cache.set(id, this.player)
			}
			catch (e) {
				this.error = true
			}
		}
		this.loading = false

	},
	components: { playerinfo, classes, PulseLoader, ranking },
	methods: {
		clear() {
			cache.remove(this.id)
			this.$router.go(0)
		}
	}
}
</script>