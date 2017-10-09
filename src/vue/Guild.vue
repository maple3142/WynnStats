<template>
	<div>
		<b-row class="justify-content-md-center pb-2">
			<b-col md="8">
				<PulseLoader class="text-center" :loading="loading" size="100px"></PulseLoader>

				<b-alert :show="error" variant="danger">Guild {{name}} not found.</b-alert>

				<div v-if="guild">
					<!--information-->
					<b-row class="pb-2">
						<b-col class="text-center">
							<b-row>
								<GuildInfo :guild="guild" />
							</b-row>
						</b-col>
					</b-row>
					<b-row class="pb-2">
						<b-col class="text-center">
							<b-row>
								<Clear :href="`https://wynncraft.com/stats/guild/${name}`" @clear="clear" />
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
							<Member :members="guild.members" />
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import GuildInfo from './guild/GuildInfo'
import Member from './guild/Member'
import Clear from './widget/Clear'

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
	components: { PulseLoader, GuildInfo, Member, Clear },
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
