<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8">
				<pulse-loader class="text-center" :loading="loading" size="100px"></pulse-loader>

				<b-alert :show="error" variant="danger">Getting onlineplayers failed.</b-alert>

				<div v-if="result">
					<b-row class="justify-content-md-center p-2">
						<b-col md="8">
							<b-input-group class="p-2">
								<b-input-group-button>
									<!--format: servername(server player count)-->
									<dropdown-select :list="serverlist" :text="`${cur}(${result[cur].length})`" v-model="cur" variant="success">
										<span slot-scope="row">{{row.value}}({{result[row.value].length}})</span>
									</dropdown-select>

								</b-input-group-button>

								<b-form-input v-model="filter" placeholder="Filter"></b-form-input>
							</b-input-group>
						</b-col>
					</b-row>
					<b-row class="justify-content-md-center p-2">
						<b-col md="6" class="text-center">
							<b-row>
								<b-col>
									<page-list :list="result[cur]" :filter="filter">
										<template slot-scope="row">
											<Id :id="row.value" />
										</template>
									</page-list>
								</b-col>
							</b-row>
							<b-row>
								<Clear @clear="clear" />
							</b-row>
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
import Dropdown from './widget/Dropdown'
import Clear from './widget/Clear'
import DropdownSelect from './widget/DropdownSelect'

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
			filter: ''
		}
	},
	storage: {
		namespace: 'wynn-onlineplayers',
		data: {
			cur: '' //selected server name
		}
	},
	components: { PulseLoader, Id, PageList, Dropdown, Clear, DropdownSelect },
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

		if (!(this.cur in this.result)) {
			this.cur = _.findKey(this.result, ar => ar.length > 0) //first server has player
		}

		this.updateCur()
	},
	methods: {
		clear() {
			cache.remove('onlineplayer')
			this.$router.go(0)
		},
		updateCur(){
			if (this.$route.query.srv) {
				this.cur = this.$route.query.srv
				this.$router.replace(this.$route.path) //remove query
			}
		}
	},
	computed: {
		serverlist() {
			return Object.keys(this.result).filter(s => this.result[s].length > 0)
		}
	},
	watch: {
		$route() {
			this.updateCur()
		}
	}
}
</script>
