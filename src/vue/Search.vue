<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8">
				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Search failed.</b-alert>

				<div v-if="result">
					<b-row class="justify-content-md-center p-2 text-center">
						<b-col cols="12" md="6" v-if="result.guilds.length">
							<h4>Guilds</h4>
							<List :list="result.guilds">
								<template scope="row">
									<b-link :to="`/guild/${row.value}`">{{row.value}}</b-link>
								</template>
							</List>
						</b-col>
						<b-col cols="12" md="6" v-if="result.players.length">
							<h4>Players</h4>
							<List :list="result.players">
								<template scope="row">
									<Id :id="row.value"/>
								</template>
							</List>
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Id from './widget/Id.vue'
import List from './search/List.vue'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import { Cache } from '@/cache'
const cache = new Cache({ namespace: 'search-cache', expire: 60 * 1000 }) //timeout: 1 min
import { search } from '@/wynn'

export default {
	data() {
		return {
			search: this.$route.params.search,
			result: null,
			error: false,
			loading: true
		}
	},
	components: { PulseLoader, Id, List },
	async created() {
		let s = this.search
		if (cache.has(s)) {
			this.result = cache.get(s)
		}
		else {
			try {
				this.result = await search(s)
				cache.set(s, this.result)
			}
			catch (e) {
				this.error = true
			}
		}
		this.loading = false
	}
}
</script>
