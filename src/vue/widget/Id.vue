<template>
	<div>
		<b-img-lazy fluid :src="`https://crafatar.com/avatars/${id}?size=20`" :rel="`${id}'s head'`"/>
		<b-link :to="`/player/${id}`">{{id}}</b-link>
	</div>
</template>
<script>
export default {
	props: {
		id: String
	}
}
</script>
