<template>
	<div>
		<b-row align-h="center" class="p-2">
			<b-col cols="12" class="text-center p-2">
				<b-img :src="require('@/assets/logo.png')" fluid class="p-2 disable" alt="wynncraft logo" />
			</b-col>
			<b-col md="8">
				<b-input-group class="p-2">
					<b-input-group-prepend>
						<dropdown-select
							v-model="type"
							:list="['search', 'player', 'guild']"
							:text="type | capitalize"
							variant="success"
						>
							<span slot-scope="row" class="capitalize">{{ row.value }}</span>
						</dropdown-select>
					</b-input-group-prepend>

					<label for="input" class="sr-only">{{ type }}</label>
					<b-form-input id="input" v-model="id" :placeholder="placeholder" @keypress.enter.native="search" />

					<b-input-group-append>
						<label for="ps" class="sr-only">Search Player</label>
						<b-btn id="ps" variant="primary" @click="search">
							<i class="fa fa-search" aria-hidden="true" />
							<span class="sr-only">Search</span>
						</b-btn>
					</b-input-group-append>
				</b-input-group>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import DropdownSelect from './widget/DropdownSelect'
export default {
	components: { DropdownSelect },
	data() {
		return {
			id: '',
			guild: '',
			type: 'search'
		}
	},
	storage: {
		namespace: 'Home',
		keys: ['type']
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
			return ''
		}
	},
	methods: {
		search() {
			if (!this.id) return
			this.$router.push(`/${this.type}/${this.id}`)
		}
	}
}
</script>
<style scoped>
img.disable {
	user-select: none;
	-webkit-user-drag: none;
}
</style>
