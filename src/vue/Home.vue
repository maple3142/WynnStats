<template>
	<div>
		<b-row class="justify-content-md-center pb-2">
			<b-col cols="12" class="text-center p-2">
				<b-img :src="require('@/assets/logo.png')" fluid class="img-responsive p-2" alt="wynncraft logo" />
			</b-col>
			<b-col md="8">
				<b-input-group class="p-2">
					<b-input-group-button>
						<Dropdown :text="type" variant="success">
							<b-dropdown-item @click="type = 'player'">Player</b-dropdown-item>
							<b-dropdown-item @click="type = 'guild'">Guild</b-dropdown-item>
						</Dropdown>
					</b-input-group-button>

					<b-form-input v-model="id" @keypress.enter.native="search" :placeholder="placeholder"></b-form-input>

					<b-input-group-button slot="right" aria-label="search player">
						<label for="ps" class="sr-only">Search Player</label>
						<b-btn variant="primary" @click="search" id="ps">
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
import Dropdown from './widget/Dropdown'
export default {
	data() {
		return {
			id: '',
			guild: ''
		}
	},
	storage: {
		namespace: 'wynn-home',
		data: {
			type: 'player'
		}
	},
	methods: {
		search() {
			if (!this.id) return
			let id = this.id
			this.id = ''
			this.$router.push(`/${this.type}/${id}`)
		}
	},
	computed: {
		placeholder() {
			if (this.type === 'player') {
				return 'Minecraft ID'
			}
			else {
				return 'Guild Name'
			}
		}
	},
	components: { Dropdown }
}
</script>
