<template>
	<div>
		<b-row align-h="center" class="p-2">
			<b-col md="10" class="text-center">
				<pulse-loader class="text-center" :loading="loading" size="100px"></pulse-loader>

				<b-alert :show="error" variant="danger">Fetching leaderboard error.</b-alert>

				<div v-if="list">
					<b-row>
						<b-col>
							<h3 class="capitalize">{{type}} LeaderBoard</h3>
						</b-col>
					</b-row>
					<b-row>
						<b-col v-if="list" class="text-center">
							<b-form-group v-if="type==='pvp'">
								<b-form-radio-group  v-model="timeframe" :options="[{text: 'All Time',value: 'alltime'},{text: 'Weekly',value: 'week'}]" size="sm" @change="fetchdata" />
							</b-form-group>

							<b-row align-h="center" class="p-2">
								<b-col md="8">
									<b-form-input v-model="filter" type="text" placeholder="Filter" />
								</b-col>
							</b-row>

							<b-row class="text-center">
								<list v-if="list" v-bind="{list,type,filter}" />
							</b-row>
						</b-col>
					</b-row>
					<b-row>
						<clear href="https://wynncraft.com/stats/" @clear="clear" />
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

import cache from '@/cacheStorage'
import { getLeaderBoard } from '@/wynn'

export default {
	data() {
		return {
			type: this.$route.params.type,
			error: false,
			loading: true,
			filter: ''
		}
	},
	storage: {
		storage: cache(),
		namespace: 'LeaderBoard',
		data: {
			timeframe: 'alltime',
			lists: {}
		}
	},
	components: { PulseLoader, List, Clear },
	created() {
		this.fetchdata()
	},
	computed: {
		list() {
			return this.lists[this.type + (this.type === 'pvp' ? this.timeframe : '')]
		}
	},
	methods: {
		async fetchdata() {
			this.loading = true
			let name = this.type + (this.type === 'pvp' ? this.timeframe : '')
			if (!this.lists[name]) {
				try {
					this.$set(this.lists, name, await getLeaderBoard(this.type, this.timeframe))
				} catch (e) {
					this.error = true
				}
			}
			this.loading = false
		},
		clear() {
			this.$delete(this.lists, this.type + (this.type === 'pvp' ? this.timeframe : ''))
			this.$router.go(0)
		}
	},
	watch: {
		timeframe(v) {
			this.fetchdata()
		}
	}
}
</script>
<style scoped>
.capitalize {
	text-transform: capitalize;
}
</style>
