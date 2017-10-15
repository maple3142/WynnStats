<template>
	<dropdown v-bind="$props">
		<b-dropdown-item v-for="item in list" :key="item" @click="update(item)" :class="clazz(item)">
			<slot :value="item"/>
		</b-dropdown-item>
	</dropdown>
</template>
<script>
import Dropdown from './Dropdown'
export default {
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
		activeClass: {
			type: String,
			default: 'active'
		},
		value: String
	},
	components: { Dropdown },
	methods: {
		update(item) {
			this.$emit('input', item)
		},
		clazz(cur) {
			let cls = {}
			cls[this.activeClass] = (this.value === cur)
			return cls
		}
	}
}
</script>
