<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8">
				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Getting onlineplayers failed.</b-alert>

				<div v-if="result">
					<b-nav justified tabs class="pb-2">
						<b-nav-item v-for="(srv,srvname) in result" v-if="srv.length" :active="srvname === cur" :key="srvname" @click="cur = srvname">
							{{srvname}}({{srv.length}})
						</b-nav-item>
					</b-nav>
					<b-row class="justify-content-md-center p-2">
						<b-col md="6">
							<PageList :list="result[cur]">
								<template scope="row">
									<Id :id="row.value" />
								</template>
							</PageList>
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import _ from 'lodash'

import PageList from './widget/PageList'
import Id from './widget/Id'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import { Cache } from '@/cache'
const cache = new Cache({ namespace: 'onlineplayer-cache', expire: 10 * 1000 }) //timeout: 10 sec
import { getOnlinePlayers } from '@/wynn'

export default {
	data() {
		return {
			result: null,
			error: false,
			loading: true,
			cur: '',
			console
		}
	},
	components: { PulseLoader, Id, PageList },
	async created() {
		let s = 'onlineplayer'
		if (cache.has(s)) {
			this.result = cache.get(s)
		}
		else {
			try {
				this.result = await getOnlinePlayers()
				cache.set(s, this.result)
			}
			catch (e) {
				this.error = true
			}
		}
		this.loading = false

		this.result = _(this.result).toPairs().sortBy(0).fromPairs().value() //sort object keys
		this.cur = _.findKey(this.result, ar => ar.length > 0) //first server has player
	}
}
</script>
