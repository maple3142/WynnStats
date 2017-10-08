<template>
	<div class="p-1">
		<b-img fluid :src="`https://crafatar.com/avatars/${id}?size=20`"></b-img>
		<router-link :to="`/player/${id}`">{{id}}</router-link>
	</div>
</template>
<script>
export default {
	props: ['id']
}
</script>
