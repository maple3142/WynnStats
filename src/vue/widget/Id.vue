<template functional>
	<div>
		<b-img-lazy fluid :src="`https://crafatar.com/avatars/${props.id}?size=20`" :rel="`${props.id}'s head'`"/>
		<b-link :to="`/player/${props.id}`">{{props.id}}</b-link>
	</div>
</template>