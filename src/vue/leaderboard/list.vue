<template>
	<b-col>
		<b-row>
			<b-col>
				<b-table responsive striped hover :items="list" :current-page="page" :per-page="10" :fields="field" :filter="filter" @filtered="filtered">
					<template slot="num" scope="row">
						<span>
							<span v-if="row.value<=3" :class="`rank${row.value}`">♛</span>
							{{row.value}}
						</span>
					</template>
					<template slot="name" scope="row">
						<router-link v-if="type!=='guild'" :to="`/player/${row.value}`">
							<b-img-lazy fluid :src="`https://crafatar.com/avatars/${row.value}?size=20`"/>
							{{row.value}}
						</router-link>
						<router-link v-else :to="`/guild/${row.value}`">{{row.value}}</router-link>
					</template>
					<template slot="minPlayed" scope="row">
						{{row.value | toHours}} hours
					</template>
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
import fields from './fields.json'
export default {
	props: ['list', 'type','filter'],
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
			this.rows=data.length
			this.page=1
		}
	}
}
</script>
<style scoped>
.rank1{
	color: #F9FF00;
}
.rank2{
	color: #969696;
}
.rank3{
	color: #A26A21;
}
</style>
