<template>
	<div class="p-1">
		<b-img-lazy fluid :src="`https://crafatar.com/avatars/${id}?size=20`" :rel="`${id}'s head'`"/>
		<router-link :to="`/player/${id}`">{{id}}</router-link>
	</div>
</template>
<script>
export default {
	props: ['id']
}
</script>
