<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="10">
				<pulse-loader class="text-center" :loading="loading" size="100px" />

				<b-alert :show="error" variant="danger">
					Getting itemDB failed or item not found.
				</b-alert>

				<b-row v-if="!loading && item" align-h="center" class="p-2">
					<item-info :item="item" full />
				</b-row>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'
import db from '@/itemdb'
import ItemInfo from './item/ItemInfo'
import { getAllItem } from '@/wynn'

export default {
	components: { PulseLoader, ItemInfo },
	data() {
		return {
			error: false,
			loading: true,
			name: '',
			item: null
		}
	},
	async created() {
		if ((await db.items.count()) === 0) {
			try {
				await db.items.bulkPut(await getAllItem())
			} catch (e) {
				this.error = true
			}
		}
		this.loading = false

		this.name = this.$route.params.name
		let item = await db.items.get({ name: this.name })
		if (!item) {
			this.error = true
		} else {
			this.item = item
		}
		return
	}
}
</script>
