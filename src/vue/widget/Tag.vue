<template>
	<span v-if="tagtext" :class="tagclass">
		{{tagtext}}
	</span>
</template>
<script>
export default {
	props: {
		tag: String,
		rank: {
			type: String,
			default: 'Player'
		},
		veteran: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		tagtext() {
			if (this.rank !== 'Player') {
				return this.rank
			}
			if (this.veteran) {
				return 'Veteran'
			}
			return this.tag
		},
		tagclass() {
			if (this.rank !== 'Player') {
				return this.rank.toUpperCase().replace(' ', '_')
			}
			if (this.tag === 'VIP+') {
				//special case, because of '+' character
				return 'VIP_PLUS'
			}
			return this.tag.toUpperCase().replace(' ', '_')
		}
	}
}
</script>
<style scoped>
.HERO {
	color: #aa00aa;
}

.VIP_PLUS {
	color: #00c3ff;
}

.VIP {
	color: #48f147;
}

.MODERATOR {
	color: #f9c700;
}

.BUILDER,
.GAME_MASTER {
	color: #0099c7;
}

.MEDIA {
	color: #4000d4;
}

.MUSIC {
	color: #e0e000;
}

.CMD {
	color: #0099c7;
}
</style>
