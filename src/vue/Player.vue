<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8">
				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">
					Player "{{id}}" not found.Try to
					<b-link :to="`/search/${id}`">search</b-link> it?
				</b-alert>

				<!--top-->
				<b-row v-if="player" class="pb-2">
					<!--left-->
					<b-col class="text-center" cols="12" md="6">
						<!--skin-->
						<b-row>
							<b-col>
								<b-img :src="`https://visage.surgeplay.com/bust/350/${id}.png`" fluid :alt="`${id} skin`" class="img-responsive" />
							</b-col>
						</b-row>
					</b-col>
					<!--right-->
					<b-col class="text-center" md="6">
						<!--information-->
						<b-row>
							<PlayerInfo :player="player" class="p-2" />
						</b-row>
						<b-row>
							<Clear :href="`https://wynncraft.com/stats/player/${id}`" @clear="clear" />
						</b-row>
					</b-col>
				</b-row>
				<!--middle-->
				<b-row v-if="player" class="text-center">
					<Ranking :rankings="player.rankings">
					</ranking>
				</b-row>
				<!--bottom-->
				<b-row v-if="player">
					<Classes :classes="player.classes" class="p-2">
					</classes>
				</b-row>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import PlayerInfo from './player/PlayerInfo'
import Classes from './player/Classes'
import Ranking from './player/Ranking'
import Clear from './widget/Clear'

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
	components: { PlayerInfo, Classes, PulseLoader, Ranking, Clear },
	methods: {
		clear() {
			cache.remove(this.id)
			this.$router.go(0)
		}
	}
}
</script>