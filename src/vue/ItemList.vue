<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="10">
				<pulse-loader class="text-center" :loading="loading" size="100px" />

				<b-alert :show="error" variant="danger">
					Getting itemDB failed or item not found.
				</b-alert>

				<b-row v-if="!loading" align-h="center" class="p-2">
					<b-col md="9">
						<b-row class="pb-2">
							<b-col>
								<b-form-input v-model="filter.search" placeholder="Item Name" @keydown.enter="search" />
							</b-col>
						</b-row>
						<b-row class="pb-2">
							<b-col>
								<b-input-group>
									<b-input-group-text>Rarity</b-input-group-text>
									<b-form-select v-model="filter.rarity" :options="RARITY" />
								</b-input-group>
							</b-col>
							<b-col>
								<b-input-group>
									<b-input-group-text>Type</b-input-group-text>
									<b-form-select v-model="filter.type" :options="TYPE" />
								</b-input-group>
							</b-col>
						</b-row>
						<b-row class="pb-2">
							<b-col>
								<b-input-group>
									<b-input-group-text>Min lv.</b-input-group-text>
									<b-form-input
										v-model="filter.min"
										type="number"
										min="0"
										:max="filter.max"
										@keydown.enter="search"
									/>
								</b-input-group>
							</b-col>
							<b-col>
								<b-input-group>
									<b-input-group-text>Max lv.</b-input-group-text>
									<b-form-input
										v-model="filter.max"
										type="number"
										:min="filter.min"
										max="100"
										@keydown.enter="search"
									/>
								</b-input-group>
							</b-col>
						</b-row>
						<b-row class="pb-2">
							<b-col>
								<b-button class="w-100" variant="success" @click="search">
									Search
								</b-button>
							</b-col>
						</b-row>
						<b-row class="pb-2">
							<b-col class="text-center">
								Total Result{{ items.length > 1 ? 's' : '' }}: {{ items.length }}
							</b-col>
						</b-row>
					</b-col>
				</b-row>
				<b-row align-h="center" class="p-2">
					<b-col md="9">
						<div class="row">
							<b-col cols="12" md="6">
								<item-info
									v-for="it in evenDisplayedItems"
									:key="it.name"
									md="12"
									class="mb-4"
									:item="it"
								/>
							</b-col>
							<b-col cols="12" md="6">
								<item-info
									v-for="it in oddDisplayedItems"
									:key="it.name"
									md="12"
									class="mb-4"
									:item="it"
								/>
							</b-col>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<infinite-loading ref="infiniteLoading" spinner="waveDots" @infinite="loadMore">
							<span slot="no-more">End of list</span>
						</infinite-loading>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'
import InfiniteLoading from 'vue-infinite-loading'
import db from '@/itemdb'
import ItemInfo from './item/ItemInfo'
import { getAllItem } from '@/wynn'
import escRegex from 'escape-string-regexp'

const params = ['search', 'rarity', 'type', 'min', 'max'] //url params

export default {
	components: { PulseLoader, ItemInfo, InfiniteLoading },
	data() {
		return {
			error: false,
			loading: true,
			name: '',
			items: [],
			// filter
			filter: {
				search: '',
				rarity: 'Any',
				type: 'Any',
				min: 0,
				max: 100
			},
			RARITY: ['Any', 'Normal', 'Unique', 'Set', 'Rare', 'Legendary', 'Mythic'],
			TYPE: [
				'Any',
				'Spear',
				'Wand',
				'Dagger',
				'Bow',
				'Helmet',
				'Chestplate',
				'Leggings',
				'Boots',
				'Ring',
				'Necklace',
				'Bracelet'
			],
			// infinite scroll
			displayedItems: [],
			page: 0
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

		this.items = await db.items.toArray()
		this.render()
	},
	async mounted() {
		// parse query to filters
		let cnt = 0
		for (let k in this.$route.query) {
			if (params.includes(k)) {
				this.filter[k] = this.$route.query[k]
				cnt++
			}
		}
		if (cnt) {
			this.search()
		} else {
			this.items = await db.items.toArray()
		}
	},
	computed: {
		evenDisplayedItems() {
			return this.displayedItems.filter((x, i) => i % 2 == 0)
		},
		oddDisplayedItems() {
			return this.displayedItems.filter((x, i) => i % 2 == 1)
		}
	},
	methods: {
		loadMore($state) {
			setTimeout(() => {
				if (this.page * 2 > this.items.length && $state) {
					$state.complete()
					return
				}
				this.displayedItems = this.displayedItems.concat(this.items.slice(this.page * 2, this.page * 2 + 2)) // 2 item per scroll
				this.page++
				if ($state) {
					$state.loaded()
				}
			}, 10)
		},
		render() {
			this.displayedItems = []
			this.buzy = false
			this.page = 0
			this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
		},
		async search() {
			let f = this.filter
			let reg
			try {
				reg = new RegExp(f.search, 'i')
			} catch (e) {
				//if not a vaild regex
				reg = new RegExp(escRegex(f.search), 'i')
			}

			const whereobj = {}
			let query = db.items
			if (f.rarity !== 'Any') whereobj.tier = f.rarity
			if (f.type !== 'Any') whereobj.type = f.type
			if (Object.keys(whereobj).length !== 0) {
				query = query.where(whereobj)
			}
			const items = await query.toArray()
			this.items = items.filter(i => reg.test(i.name) && i.level >= f.min && i.level <= f.max)
			this.render()

			//generate querystring and append
			let qs = params.map(p => `${p}=${this.filter[p]}`).join('&')
			this.$router.push(`?${qs}`).catch(e => {}) // suppress NavigationDuplicated
		}
	}
}
</script>
