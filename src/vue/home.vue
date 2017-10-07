<template>
	<div>
		<b-row class="justify-content-md-center pb-2">
			<b-col cols="12" class="text-center">
				<b-img :src="require('@/assets/logo.png')" fluid class="img-responsive p-2"/>
			</b-col>
			<b-col>
				<b-input-group>
					<!-- Add-ons -->
					<b-input-group-addon>Minecraft id</b-input-group-addon>

					<!-- Main form input -->
					<b-form-input v-model="id" @keypress.enter.native="query"></b-form-input>

					<!-- Attach Right button Group via slot -->
					<b-input-group-button slot="right">
						<b-btn variant="primary" @click="query">Search</b-btn>
					</b-input-group-button>
				</b-input-group>
			</b-col>
		</b-row>
	</div>
</template>
<script>
export default {
	data() {
		return {
			id: ''
		}
	},
	methods: {
		query() {
			let id = this.id
			this.id = ''
			this.$router.push(`/${id}`)
		}
	}
}
</script>
