<template>
	<div>
		<b-row align-h="center"
		       class="p-2">
			<b-col md="8">
				<pulse-loader class="text-center"
				              :loading="loading"
				              size="100px"></pulse-loader>

				<b-alert :show="error"
				         variant="danger">
					Player "{{id}}" not found.Try to
					<b-link :to="`/search/${id}`">search</b-link> it?
				</b-alert>

				<!--top-->
				<b-row v-if="player"
				       class="pb-2">
					<!--left-->
					<b-col class="text-center"
					       cols="12"
					       md="6">
						<!--skin-->
						<b-row>
							<b-col>
								<b-img :src="`https://visage.surgeplay.com/bust/350/${player.uuid}.png`"
								       fluid
								       :alt="`${id} skin`"
								       class="img-responsive" />
							</b-col>
						</b-row>
					</b-col>
					<!--right-->
					<b-col class="text-center"
					       md="6">
						<!--information-->
						<b-row>
							<player-info :player="player"
							             class="p-2" />
						</b-row>
						<b-row>
							<Clear :href="`https://wynncraft.com/stats/player/${id}`"
							       @clear="clear" />
						</b-row>
					</b-col>
				</b-row>
				<!--bottom-->
				<b-row v-if="player">
					<classes :classes="player.classes"
					         class="p-2" />
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

import cache from '@/cachedriver'
import { getPlayerStats, getUUID } from '@/wynn'

export default {
	data() {
		return {
			id: this.$route.params.id,
			error: false,
			loading: true,
			players: {}
		}
	},
	storage: {
		//driver: cache(),
		namespace: 'Player',
		keys: ['players']
	},
	async created() {
		if (!this.players[this.id]) {
			try {
				const wynnres = await getPlayerStats(this.id)
				const uuid = await getUUID(this.id)
				wynnres.uuid = uuid
				this.$set(this.players, this.id, wynnres)
			} catch (e) {
				this.error = true
			}
		}
		this.loading = false
	},
	computed: {
		player() {
			return this.players[this.id]
		}
	},
	components: { PlayerInfo, Classes, PulseLoader, Ranking, Clear },
	methods: {
		clear() {
			this.$delete(this.players, this.id)
			this.$router.go(0)
		}
	}
}
</script>
