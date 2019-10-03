<template>
	<b-dropdown v-bind="$props">
		<b-dropdown-item v-for="item in list" :key="item" :active="value === item" @click="update(item)">
			<slot :value="item" />
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
import Dropdown from './Dropdown'
export default {
	components: { Dropdown },
	props: {
		list: {
			type: Array,
			required: true
		},
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
		value: String
	},
	methods: {
		update(item) {
			this.$emit('input', item)
		}
	}
}
</script>
