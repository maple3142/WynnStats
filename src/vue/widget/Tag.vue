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
			if (this.tag === 'VIP+') { //special case, because of '+' character
				return 'VIP_PLUS'
			}
			return this.tag.toUpperCase().replace(' ', '_')
		}
	}
}
</script>
<style scoped>
.HERO {
	color: #AA00AA;
}

.VIP_PLUS {
	color: #00C3FF;
}

.VIP {
	color: #48F147;
}

.MODERATOR {
	color: #F9C700;
}

.BUILDER,
.GAME_MASTER {
	color: #0099C7;
}

.MEDIA {
	color: #4000D4;
}

.MUSIC {
	color: #E0E000;
}
</style>
