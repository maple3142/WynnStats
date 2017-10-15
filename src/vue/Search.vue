<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8">
				<pulse-loader class="text-center" :loading="loading" size="100px"></pulse-loader>

				<b-alert :show="error" variant="danger">Search failed.</b-alert>

				<b-alert :show="error2" variant="danger">Search string need to be longer than 3 character.</b-alert>

				<div v-if="result">
					<b-row class="justify-content-md-center p-2 text-center">
						<b-col cols="12" md="6" v-if="result.guilds.length">
							<h4>Guilds({{result.guilds.length}})</h4>
							<page-list :list="result.guilds">
								<template slot-scope="row">
									<b-link :to="`/guild/${row.value}`">{{row.value}}</b-link>
								</template>
							</page-list>
						</b-col>
						<b-col cols="12" md="6" v-if="result.players.length">
							<h4>Players({{result.players.length}})</h4>
							<page-list :list="result.players">
								<template slot-scope="row">
									<Id :id="row.value" />
								</template>
							</page-list>
						</b-col>
					</b-row>
					<b-row>
						<b-col class="text-center">
							<clear @clear="clear"/>
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

import { Cache } from '@/cache'
const cache = new Cache({ namespace: 'search-cache', expire: 60 * 1000 }) //timeout: 1 min
import { search } from '@/wynn'

export default {
	data() {
		return {
			search: this.$route.params.search,
			result: null,
			error: false,
			error2: false, //search string should be longer than 3 character
			loading: true
		}
	},
	components: { PulseLoader, Id, PageList,Clear },
	async created() {
		let s = this.search
		if (s.length < 3) {
			this.loading = false
			this.error2 = true
			return
		}
		if (cache.has(s)) {
			this.result = cache.get(s)
		}
		else {
			try {
				this.result = await search(s)
				cache.set(s, this.result)
			}
			catch (e) {
				console.error(e)
				this.error = true
			}
		}
		this.loading = false
	},
	methods: {
		clear() {
			cache.remove(this.search)
			this.$router.go(0)
		}
	}
}
</script>
