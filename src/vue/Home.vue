<template>
	<div>
		<b-row align-h="center" class="p-2">
			<b-col cols="12" class="text-center p-2">
				<b-img :src="require('@/assets/logo.png')" fluid class="p-2 disable" alt="wynncraft logo" />
			</b-col>
			<b-col md="8">
				<b-input-group class="p-2">
					<b-input-group-button>
						<dropdown-select :list="['search','player','guild']" :text="type" v-model="type" variant="success">
							<span slot-scope="row" class="capitalize">{{row.value}}</span>
						</dropdown-select>
					</b-input-group-button>

					<label for="input" class="sr-only">{{type}}</label>
					<b-form-input v-model="id" id="input" @keypress.enter.native="search" :placeholder="placeholder"></b-form-input>

					<b-input-group-button slot="right" aria-label="search player">
						<label for="ps" class="sr-only">Search Player</label>
						<b-btn variant="primary" @click="search" id="ps">
							<i class="fa fa-search" aria-hidden="true"></i>
							<span class="sr-only">Search</span>
						</b-btn>
					</b-input-group-button>
				</b-input-group>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Dropdown from './widget/Dropdown'
import DropdownSelect from './widget/DropdownSelect'
export default {
	data() {
		return {
			id: '',
			guild: ''
		}
	},
	storage: {
		namespace: 'Home',
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
	components: { Dropdown, DropdownSelect }
}
</script>
<style scoped>
img.disable {
	user-select: none;
	-webkit-user-drag: none;
}
</style>
