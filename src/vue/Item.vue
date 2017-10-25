<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8">
				<pulse-loader class="text-center" :loading="loading" size="100px"></pulse-loader>

				<b-alert :show="error" variant="danger">Getting itemDB failed or item not found.</b-alert>

				<template v-if="!loading">
					<template v-if="!item">
						<b-row align-h="center" class="p-2">
							<b-col md="9">
								<b-row class="pb-2">
									<b-col>
										<b-form-input v-model="filter.search" placeholder="Item Name"/>
									</b-col>
								</b-row>
								<b-row class="pb-2">
									<b-col>
										<b-input-group left="Rarity">
											<b-form-select v-model="filter.rarity" :options="['Any','Normal','Unique','Set','Rare','Legendary','Mythic']"/>
										</b-input-group>
									</b-col>
									<b-col>
										<b-input-group left="Type">
											<b-form-select v-model="filter.type" :options="['Any','Spear','Wand','Dagger','Bow','Helmet','Chestplate','Leggings','Boots','Ring','Necklace','Bracelet']"/>
										</b-input-group>
									</b-col>
								</b-row>
								<b-row class="pb-2">
									<b-col>
										<b-input-group left="Min lv.">
											<b-form-input type="number" min="0" :max="filter.max" v-model="filter.min"/>
										</b-input-group>
									</b-col>
									<b-col>
										<b-input-group left="Max lv.">
											<b-form-input type="number" :min="filter.min" max="100" v-model="filter.max"/>
										</b-input-group>
									</b-col>
								</b-row>
								<b-row class="pb-2">
									<b-col>
										<b-button class="w-100" variant="success" @click="search">Search</b-button>
									</b-col>
								</b-row>
								<b-row class="pb-2">
									<b-col class="text-center">
										Total {{filter.items.length}} Result<template v-if="filter.items.length>1">s</template>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
						<b-row align-h="center" class="p-2">
							<b-col md="9">
								<div class="row">
									<b-col cols="12" md="6">
										<item-info md="12" v-for="(i,idx) in displayedItems" :key="i.name" v-if="idx%2===0" class="mb-4" :item="i"></item-info>
									</b-col>
									<b-col cols="12" md="6">
										<item-info md="12" v-for="(i,idx) in displayedItems" :key="i.name" v-if="idx%2===1" class="mb-4" :item="i"></item-info>
									</b-col>
								</div>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<infinite-loading spinner="waveDots" @infinite="loadMore" ref="infiniteLoading">
									<span slot="no-more">End of list</span>
								</infinite-loading>
							</b-col>
						</b-row>
					</template>
					<template v-else>
						<b-row align-h="center" class="p-2">
							<item-info :item="item" full></item-info>
						</b-row>
					</template>
				</template>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'
import InfiniteLoading from 'vue-infinite-loading'

import ItemInfo from './item/ItemInfo'

import cache from '@/cacheStorage'
import { getAllItem } from '@/wynn'

import _ from 'lodash'
import escRegex from 'escape-string-regexp'

const params = ['search', 'rarity', 'type', 'min', 'max'] //url params

export default {
	data() {
		return {
			error: false,
			loading: true,
			name: '',
			item: null,
			// filter
			filter: {
				search: '',
				rarity: 'Any',
				type: 'Any',
				min: 0,
				max: 100,
				items: []
			},
			// infinite scroll
			displayedItems: [],
			page: 0
		}
	},
	storage: {
		storage: cache(7 * 24 * 60 * 60 * 1000), //7days
		namespace: 'Item',
		data: {
			items: null
		}
	},
	async created() {
		if (!this.items) {
			try {
				this.items = await getAllItem()
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

		this.filter.items = this.items //initial
	},
	mounted() {
		// query behavior
		let cnt = 0
		for (let k in this.$route.query) {
			if (params.includes(k)) {
				this.filter[k] = this.$route.query[k]
				cnt++
			}
		}
		if (cnt) {
			this.search()
		}
	},
	components: { PulseLoader, ItemInfo, InfiniteLoading },
	methods: {
		loadMore($state) {
			setTimeout(() => {
				if (this.page * 2 > this.filter.items.length && $state) {
					$state.complete()
					return
				}
				this.displayedItems = this.displayedItems.concat(this.filter.items.slice(this.page * 2, this.page * 2 + 2)) // 2 item per scroll
				this.page++
				if ($state) {
					$state.loaded()
				}
			}, 10)
		},
		rerender() {
			this.displayedItems = []
			this.buzy = false
			this.page = 0
			this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
		},
		search() {
			let f = this.filter
			let reg
			try {
				reg = new RegExp(f.search, 'i')
			}
			catch (e) { //if not a vaild regex
				reg = new RegExp(escRegex(f.search), 'i')
			}

			this.filter.items = _(this.items)
				.filter(i => reg.test(i.name))
				.filter(i => i.tier === f.rarity || f.rarity === 'Any')
				.filter(i => i.type === f.type || i.accessoryType === f.type || f.type === 'Any')
				.filter(i => i.level >= f.min && i.level <= f.max)
				.value()
			this.rerender()

			//generate querystring and append
			let qs = params.map(p => `${p}=${this.filter[p]}`).join('&')
			this.$router.replace(`?${qs}`)
		}
	}
}
</script>
