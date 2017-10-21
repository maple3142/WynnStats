<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8">
				<pulse-loader class="text-center" :loading="loading" size="100px"></pulse-loader>

				<b-alert :show="error" variant="danger">Getting itemDB failed or item not found.</b-alert>

				<div v-if="items">
					<b-row class="justify-content-md-center p-2">
						<b-col md="8">
							
						</b-col>
					</b-row>
				</div>

				<div v-if="item">
					<b-row class="justify-content-md-center p-2">
						<item-info :item="item"></item-info>
					</b-row>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'

import ItemInfo from './item/ItemInfo'

import { Cache } from '@/cache'
const cache = new Cache({ namespace: 'itemDB-cache', expire: 7 * 24 * 60 * 60 * 1000 }) //timeout: 7 days
import { getAllItem } from '@/wynn'

export default {
	data() {
		return {
			items: null,
			error: false,
			loading: true,
			name: '',
			item: null
		}
	},
	async created() {

		let s = 'itemDB'
		if (cache.has(s)) {
			this.items = cache.get(s)
		}
		else {
			try {
				this.items = await getAllItem()
				cache.set(s, this.items)
			}
			catch (e) {
				this.error = true
			}
		}
		this.loading = false

		if (this.$route.params.name) {
			this.name = this.$route.params.name
			let item = this.items.filter(i => i.name === this.name)[0]
			if (!item) {
				this.error = true
			}
			else {
				this.item = item
			}
		}
	},
	components: { PulseLoader, ItemInfo }
}
</script>
