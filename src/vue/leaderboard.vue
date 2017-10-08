<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="10" class="text-center">
				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Fetching leaderboard error.</b-alert>

				<b-row>
					<b-col>
						<h3 class="capitalize">{{type}} LeaderBoard</h3>
					</b-col>
				</b-row>
				<b-row>
					<b-col v-if="list" class="text-center">
						<b-form-radio-group v-if="type==='pvp'" v-model="timeframe" :options="[{text: 'All Time',value: 'alltime'},{text: 'Weekly',value: 'week'}]" size="sm" @change="fetchdata" />

						<b-row class="justify-content-md-center p-2">
							<b-col md="8">
								<b-form-input v-model="filter" type="text" placeholder="filter" />
							</b-col>
						</b-row>

						<b-row class="text-center">
							<list v-if="list" v-bind="{list,type,filter}" />
						</b-row>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<a href="https://wynncraft.com/stats/" target="_blank" rel="noopener">Official Stats</a>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<b-button variant="danger" @click="clear" v-b-tooltip.hover title="WynnStats will cache data for 10min by default.">Force refresh</b-button>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import list from './leaderboard/list'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import { Cache } from '@/cache'
const cache = new Cache({ namespace: 'leaderboard-cache' })
import { getLeaderBoard } from '@/wynn'

export default {
	data() {
		return {
			type: this.$route.params.type,
			list: null,
			error: false,
			loading: true
		}
	},
	storage: {
		namespace: 'wynn-leaderboard',
		data: {
			timeframe: 'alltime',
			filter: ''
		}
	},
	components: { PulseLoader, list },
	created() {
		this.fetchdata()
	},
	methods: {
		async fetchdata() {
			this.list = null
			this.loading = true
			let type = this.type
			let name = type + (type === 'pvp' ? this.timeframe : '')
			if (cache.has(name)) {
				this.list = cache.get(name)
			}
			else {
				try {
					this.list = await getLeaderBoard(type, this.timeframe)
					cache.set(name, this.list)
				}
				catch (e) {
					this.error = true
				}
			}
			this.loading = false
		},
		clear() {
			cache.remove(this.type + (this.type === 'pvp' ? this.timeframe : ''))
			this.$router.go(0)
		}
	}
}
</script>
<style scoped>
.capitalize {
	text-transform: capitalize;
}
</style>
