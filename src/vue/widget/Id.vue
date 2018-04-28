<template>
	<div>
		<b-img-lazy v-if="uuid!==null"
		            fluid
		            :src="`https://crafatar.com/avatars/${uuid}?size=20`"
		            :rel="`${id}'s head'`" />
		<b-link v-if="$slots.default==null"
		        :to="`/player/${id}`">{{id}}</b-link>
		<slot v-else/>
	</div>
</template>
<script>
export default {
	data() {
		return {
			uuid: null,
			uuids: {}
		}
	},
	storage: {
		namespace: 'uuid-cache',
		keys: ['uuid']
	},
	props: {
		id: {
			type: String,
			required: true
		}
	},
	created() {
		this.load(this.id)
	},
	methods: {
		async load(id) {
			if (id in this.uuids) {
				this.uuid = this.uuids[this.id]
				return
			}
			const { id: uuid } = await fetch(`https://api.minetools.eu/uuid/${this.id}`).then(r => r.json())
			if (uuid !== 'null') this.uuid = uuid
			else this.uuid = '8667ba71b85a4004af54457a9734eed7' //a steve skin uuid
			this.uuids[id] = this.uuid
		}
	},
	watch: {
		id(id) {
			this.load(id)
		}
	}
}
</script>
