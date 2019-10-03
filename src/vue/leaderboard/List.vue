<template>
	<b-col>
		<b-row>
			<b-col class="table-responsive">
				<b-table
					striped
					hover
					:items="list"
					:current-page="page"
					:per-page="10"
					:fields="field"
					:filter="filter"
					@filtered="filtered"
				>
					<template v-slot:cell(num)="data">
						<span v-if="data.value <= 3" :class="`rank${data.value}`" aria-hidden="true">♛</span>
						{{ data.value }}
					</template>
					<template v-slot:cell(name)="data">
						<id v-if="type !== 'guild'" :id="data.value" />
						<b-link v-else :to="`/guild/${data.value}`">
							{{ data.value }}
						</b-link>
					</template>
					<template v-slot:cell(minPlayed)="data">
						{{ data.value | toHours }} hours
					</template>
					<template v-slot:cell(tag)="data">
						<tag :tag="data.value" :rank="data.item.rank" :veteran="data.item.veteran" />
					</template>
				</b-table>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-pagination v-model="page" align="center" size="md" :total-rows="rows" :per-page="10" />
			</b-col>
		</b-row>
	</b-col>
</template>
<script>
import Tag from '../widget/Tag'
import Id from '../widget/Id'

import fields from './fields.json'
export default {
	components: { Tag, Id },
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
	}
}
</script>
<style scoped>
.rank1 {
	color: #f9ff00;
}

.rank2 {
	color: #969696;
}

.rank3 {
	color: #a26a21;
}
</style>
