<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="10" class="text-center">
				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Fetching leaderboard error.</b-alert>

				<div v-if="list">
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
								<List v-if="list" v-bind="{list,type,filter}" />
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<Clear href="https://wynncraft.com/stats/" @clear="clear" />
					</b-row>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import List from './leaderboard/List'
import Clear from './widget/Clear'

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
	components: { PulseLoader, List, Clear },
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
