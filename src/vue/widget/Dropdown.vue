<!--create this because of default dropdown caret doesn't show property-->
<template>
	<b-dropdown v-if="!nav"
	            @shown="expand = true"
	            @hidden="expand = false"
	            :variant="variant">
		<template slot="button-content">
			<span class="capitalize">{{text}}</span>
			<i class="fa"
			   :class="{'fa-caret-down': !expand,'fa-caret-up': expand}"
			   aria-hidden="true"></i>
		</template>
		<slot/>
	</b-dropdown>
	<!--navbar version-->
	<b-nav-item-dropdown v-else
	                     @shown="expand = true"
	                     @hidden="expand = false"
	                     :variant="variant">
		<template slot="button-content">
			<span :class="{capitalize: capitalize}">{{text}}</span>
			<i class="fa"
			   :class="{'fa-caret-down': !expand,'fa-caret-up': expand}"
			   aria-hidden="true"></i>
		</template>
		<slot/>
	</b-nav-item-dropdown>
</template>
<script>
export default {
	props: {
		nav: {
			type: Boolean,
			default: false
		},
		text: {
			type: String,
			default: ''
		},
		variant: {
			type: String,
			default: ''
		},
		capitalize: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			expand: false
		}
	}
}
</script>
<style scoped>
.dropdown-toggle::after {
	border: initial;
}
</style>
