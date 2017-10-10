<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col cols="12" class="text-center p-2">
				<b-img :src="require('@/assets/logo.png')" fluid class="p-2 disable" alt="wynncraft logo" />
			</b-col>
			<b-col md="8">
				<b-input-group class="p-2">
					<b-input-group-button>
						<Dropdown :text="type" variant="success">
							<b-dropdown-item @click="type = 'search'" :class="{active: type==='search'}">Search</b-dropdown-item>
							<b-dropdown-item @click="type = 'player'" :class="{active: type==='player'}">Player</b-dropdown-item>
							<b-dropdown-item @click="type = 'guild'" :class="{active: type==='guild'}">Guild</b-dropdown-item>
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
	</div>
</template>
<script>
import Dropdown from './widget/Dropdown'
import Clear from './widget/Clear'
import BlankLink from './widget/BlankLink'
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
			type: 'search'
		}
	},
	methods: {
		search() {
			if (!this.id) return
			this.$router.push(`/${this.type}/${this.id}`)
		}
	},
	computed: {
		placeholder() {
			switch (this.type) {
				case 'search':
					return 'Search'
				case 'player':
					return 'Minecraft ID'
				case 'guild':
					return 'Guild Name'
			}
		}
	},
	components: { Dropdown, Clear, BlankLink }
}
</script>
<style scoped>
img.disable {
	user-select: none;
	-webkit-user-drag: none; 
}
</style>
