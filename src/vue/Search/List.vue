<template>
	<div>
		<b-row>
			<b-col>
				<b-list-group>
					<b-list-group-item v-for="item in items" :key="item">
						<slot :value="item" />
					</b-list-group-item>
				</b-list-group>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-pagination size="md" :total-rows="list.length" v-model="page" :per-page="perpage" align="center" />
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
		}
	},
	data() {
		return {
			page: 1
		}
	},
	computed: {
		items() {
			let ar = this.list.slice() //copy array
			return ar.splice((this.page - 1) * 10, this.perpage)
		}
	}
}
</script>
