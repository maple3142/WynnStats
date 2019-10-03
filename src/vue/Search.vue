<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8">
				<pulse-loader class="text-center" :loading="loading" size="100px" />

				<b-alert :show="error" variant="danger">
					Search failed.
				</b-alert>

				<b-alert :show="error2" variant="danger">
					Search string need to be longer than 3 character.
				</b-alert>

				<div v-if="result">
					<b-row class="justify-content-md-center p-2 text-center">
						<b-col v-if="result.guilds.length" cols="12" md="6">
							<h4>Guilds({{ result.guilds.length }})</h4>
							<page-list :list="result.guilds">
								<template slot-scope="row">
									<b-link :to="`/guild/${row.value}`">
										{{ row.value }}
									</b-link>
								</template>
							</page-list>
						</b-col>
						<b-col v-if="result.players.length" cols="12" md="6">
							<h4>Players({{ result.players.length }})</h4>
							<page-list :list="result.players">
								<template slot-scope="row">
									<Id :id="row.value" />
								</template>
							</page-list>
						</b-col>
					</b-row>
					<b-row>
						<b-col class="text-center">
							<clear @clear="clear" />
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Id from './widget/Id'
import PageList from './widget/PageList'
import Clear from './widget/Clear'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import cache from '@/cachedriver'
import { search } from '@/wynn'

export default {
	data() {
		return {
			search: this.$route.params.search,
			error: false,
			error2: false, //search string should be longer than 3 character
			loading: true,
			results: {}
		}
	},
	storage: {
		driver: cache(60 * 1000),
		namespace: 'Search',
		keys: ['results']
	},
	components: { PulseLoader, Id, PageList, Clear },
	computed: {
		result() {
			return this.results[this.search]
		}
	},
	async created() {
		if (this.search.length < 3) {
			this.loading = false
			this.error2 = true
			return
		}
		if (!this.results[this.search]) {
			try {
				this.$set(this.results, this.search, await search(this.search))
			} catch (e) {
				this.error = true
			}
		}
		this.loading = false
	},
	// async created() {
	// 	let s = this.search
	// 	if (s.length < 3) {
	// 		this.loading = false
	// 		this.error2 = true
	// 		return
	// 	}
	// 	if (cache.has(s)) {
	// 		this.result = cache.get(s)
	// 	}
	// 	else {
	// 		try {
	// 			this.result = await search(s)
	// 			cache.set(s, this.result)
	// 		}
	// 		catch (e) {
	// 			console.error(e)
	// 			this.error = true
	// 		}
	// 	}
	// 	this.loading = false
	// },
	methods: {
		clear() {
			this.$delete(this.results, this.search)
			this.$router.go(0)
		}
	}
}
</script>
