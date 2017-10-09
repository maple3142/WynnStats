<template>
	<div>
		<b-row class="justify-content-md-center pb-2">
			<b-col cols="12" class="text-center p-2">
				<b-img :src="require('@/assets/logo.png')" fluid class="img-responsive p-2" alt="wynncraft logo"/>
			</b-col>
			<b-col md="8">
				<b-input-group class="p-2">
					<b-form-input v-model="id" @keypress.enter.native="searchPlayer" placeholder="Minecraft id"></b-form-input>

					<b-input-group-button slot="right" aria-label="search player">
						<label for="ps" class="sr-only">Search Player</label>
						<b-btn variant="primary" @click="searchPlayer" id="ps">
							<i class="fa fa-search" aria-hidden="true"></i>
						</b-btn>
					</b-input-group-button>
				</b-input-group>

				<b-input-group class="p-2">
					<b-form-input v-model="guild" @keypress.enter.native="searchGuild" placeholder="Guild name"></b-form-input>

					<b-input-group-button slot="right" aria-label="search guild">
						<label for="gs" class="sr-only">Search Guild</label>
						<b-btn variant="primary" @click="searchGuild" id="gs">
							<i class="fa fa-search" aria-hidden="true"></i>
						</b-btn>
					</b-input-group-button>
				</b-input-group>
			</b-col>
		</b-row>
		<b-row class="justify-content-md-center pb-2">
			<b-col class="text-center">
				<i>
					<b>WynnStats</b> is a serverless client which can view
					<a href="https://wynncraft.com/" target="_blank" rel="noopener">WynnCraft</a> statistics.</i>
			</b-col>
		</b-row>
	</div>
</template>
<script>
export default {
	data() {
		return {
			id: '',
			guild: ''
		}
	},
	methods: {
		searchPlayer() {
			if (!this.id) return
			let id = this.id
			this.id = ''
			this.$router.push(`/player/${id}`)
		},
		searchGuild() {
			if (!this.guild) return
			let guild = this.guild
			this.guild = ''
			this.$router.push(`/guild/${guild}`)
		}
	}
}
</script>
