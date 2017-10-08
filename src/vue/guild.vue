<template>
	<div>
		<b-row class="justify-content-md-center pb-2">
			<b-col md="10">
				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Guild {{name}} not found</b-alert>

				<div v-if="guild">
					<!--information-->
					<b-row class="pb-2">
						<b-col class="text-center">
							<b-row>
								<guildinfo :guild="guild" />
							</b-row>
						</b-col>
					</b-row>
					<b-row class="pb-2">
						<b-col class="text-center">
							<b-row>
								<b-col>
									<a :href="`https://wynncraft.com/stats/guild/${name}`" target="_blank" rel="noopener">Official Stats</a>
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<b-button variant="danger" @click="clear" v-b-tooltip.hover title="WynnStats will cache data for 10min by default.">Force refresh</b-button>
								</b-col>
							</b-row>
						</b-col>
					</b-row>

					<!--xp bar-->
					<b-row>
						<b-col>
							<b-progress :max="100">
								<b-progress-bar :value="guild.xp">
									XP: {{ guild.xp }}%
								</b-progress-bar>
							</b-progress>
						</b-col>
					</b-row>

					<b-row class="pt-2">
						<b-col class="text-center">
							<member :members="guild.members" />
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import guildinfo from './guild/guildinfo'
import member from './guild/member'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import { Cache } from '@/cache'
const cache = new Cache({ namespace: 'guild-cache' })
import { getGuildStats } from '@/wynn'

export default {
	data() {
		return {
			name: this.$route.params.name,
			guild: null,
			error: false,
			loading: true
		}
	},
	components: { PulseLoader, guildinfo, member },
	async created() {
		let name = this.name.trim()
		if (cache.has(name)) {
			this.guild = cache.get(name)
		}
		else {
			try {
				this.guild = await getGuildStats(name)
				cache.set(name, this.guild)
			}
			catch (e) {
				this.error = true
			}
		}
		this.loading = false
	},
	methods: {
		clear() {
			cache.remove(this.name)
			this.$router.go(0)
		}
	}
}
</script>
