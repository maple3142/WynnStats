<template>
	<b-col>
		<div v-if="href">
			<blank-link :href="href">Official Stats</blank-link>
		</div>
		<div>
			<a href="javascript:void(0)"
			   @click="clear"
			   v-html="text"></a>
		</div>
	</b-col>
</template>
<script>
import BlankLink from './BlankLink'
export default {
	props: {
		href: String,
		text: {
			type: String,
			default: '<i class="fa fa-refresh" aria-hidden="true"></i> Force refresh'
		}
	},
	methods: {
		clear() {
			this.$emit('clear')
		}
	},
	components: { BlankLink }
}
</script>