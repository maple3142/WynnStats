<template>
	<div class="d-flex flex-column justify-content-between">
		<b-row>
			<b-col>
				<b-list-group>
					<b-list-group-item v-for="item in items" :key="item">
						<slot :value="item" />
					</b-list-group-item>
				</b-list-group>
			</b-col>
		</b-row>
		<b-row v-if="filtered.length > perpage">
			<b-col>
				<b-pagination
					v-model="page"
					:size="size"
					:total-rows="filtered.length"
					:per-page="perpage"
					align="center"
				/>
			</b-col>
		</b-row>
	</div>
</template>
<script>
export default {
	props: {
		list: {
			type: Array,
			default: []
		},
		perpage: {
			type: Number,
			default: 10
		},
		filter: {
			type: String
		},
		startPage: {
			type: Number,
			default: 1
		},
		size: {
			type: String,
			default: 'md',
			vaildator: /^(sm|md|lg)$/
		}
	},
	data() {
		return {
			page: this.startPage
		}
	},
	computed: {
		filtered() {
			let ar = this.list
			if (this.filter) {
				ar = ar.filter(e => e.includes(this.filter))
			}

			this.$emit('filtered', ar)

			return ar
		},
		items() {
			let ar = this.filtered.slice() //copy array
			return ar.splice((this.page - 1) * 10, this.perpage)
		}
	},
	watch: {
		list() {
			this.page = this.startPage
		}
	}
}
</script>
