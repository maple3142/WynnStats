<!--component for outer link-->
<template>
	<a :href="href" rel="noopener noreferrer" target="_blank">
		<slot></slot>
	</a>
</template>
<script>
export default {
	props: {
		href: {
			type: String,
			required: true
		}
	}
}
</script>
