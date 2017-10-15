<template>
	<b-col>
		<b-row>
			<b-col>
				<b-table responsive striped hover :items="list" :current-page="page" :per-page="10" :fields="field" :filter="filter" @filtered="filtered">
					<span name="num" slot-scope="row">
						<span v-if="row.value<=3" :class="`rank${row.value}`" aria-hidden="true">♛</span>
						{{row.value}}
					</span>
					<template name="name" slot-scope="row">
						<b-link v-if="type!=='guild'" :to="`/player/${row.value}`">
							<b-img-lazy fluid :src="`https://crafatar.com/avatars/${row.value}?size=20`" :rel="`${row.value}'s head`" /> {{row.value}}
						</b-link>
						<b-link v-else :to="`/guild/${row.value}`">{{row.value}}</b-link>
					</template>
					<span name="minPlayed" slot-scope="row">{{row.value | toHours}} hours</span>
					<tag name="tag" slot-scope="row" :tag="row.value" :rank="row.item.rank" :veteran="row.item.veteran" />
				</b-table>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-pagination align="center" size="md" :total-rows="rows" v-model="page" :per-page="10" />
			</b-col>
		</b-row>
	</b-col>
</template>
<script>
import Tag from '../widget/Tag'

import fields from './fields.json'
export default {
	props: {
		list: Array,
		type: String,
		filter: String
	},
	data() {
		return {
			page: 1,
			rows: this.list.length
		}
	},
	computed: {
		field() {
			return fields[this.type]
		}
	},
	methods: {
		filtered(data) {
			this.rows = data.length
			this.page = 1
		}
	},
	components: { Tag }
}
</script>
<style scoped>
.rank1 {
	color: #F9FF00;
}

.rank2 {
	color: #969696;
}

.rank3 {
	color: #A26A21;
}
</style>
