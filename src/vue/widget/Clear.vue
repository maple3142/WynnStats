<template>
	<b-col>
		<div v-if="href">
			<a :href="href" target="_blank" rel="noopener">Official Stats</a>
		</div>
		<div>
			<a href="javascript:void(0)" @click="clear" v-html="text"></a>
		</div>
	</b-col>
</template>
<script>
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
	}
}
</script>