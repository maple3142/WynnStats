<template>
	<b-col>
		<div>
			<a :href="href" target="_blank" rel="noopener">Official Stats</a>
		</div>
		<div>
			<a href="javascript:void(0)" @click="clear">
				<i class="fa fa-refresh" aria-hidden="true"></i> Force refresh
			</a>
		</div>
	</b-col>
</template>
<script>
export default {
	props: {
		href: String
	},
	methods: {
		clear() {
			this.$emit('clear')
		}
	}
}
</script>