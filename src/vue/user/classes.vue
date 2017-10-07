<template>
	<b-col>
		<b-nav justified tabs class="pb-2">
			<b-nav-item v-for="(cls,name) in classes" :key="name" :active="name===cur" @click="select(name)">{{name}}</b-nav-item>
		</b-nav>
		<b-progress :value="data.xp" :max="100" :precision="1" show-progress></b-progress>

		<!--skills-->
		<b-list-group class="hl text-center">
			<b-list-group-item>
				<span class="sk">✤</span>Strength: {{data.skills.Strength}}
			</b-list-group-item>
			<b-list-group-item>
				<span class="sk">✦</span>Dexterity: {{data.skills.Dexterity}}
			</b-list-group-item>
			<b-list-group-item>
				<span class="sk">❉</span>Intelligence: {{data.skills.Intelligence}}
			</b-list-group-item>
			<b-list-group-item>
				<span class="sk">✹</span>Defense: {{data.skills.Defense}}
			</b-list-group-item>
			<b-list-group-item>
				<span class="sk">❋</span>Agility: {{data.skills.Agility}}
			</b-list-group-item>
		</b-list-group>

		<!--statistics-->
		<b-list-group>
			<b-list-group-item>
				Blocks walked: {{data.blocks_walked}}
			</b-list-group-item>
			<b-list-group-item>
				Chests founded: {{data.chests_found}}
			</b-list-group-item>
			<b-list-group-item>
				Deaths: {{data.deaths}}
			</b-list-group-item>
			<b-list-group-item>
				Level: {{data.level}}
			</b-list-group-item>
			<b-list-group-item>
				Login counts: {{data.logins}}
			</b-list-group-item>
			<b-list-group-item>
				Mobs killed: {{data.mobs_killed}}
			</b-list-group-item>
			<b-list-group-item>
				Playtime: {{data.playtime | toHours}} hours
			</b-list-group-item>
			<b-list-group-item>
				PvP killed: {{data.pvp_kills}}
			</b-list-group-item>
			<b-list-group-item>
				PvP deaths: {{data.pvp_deaths}}
			</b-list-group-item>
			<b-list-group-item>
				Dungeons({{data.dungeonsAmount}}):
				<span v-for="(times,dungeon,idx) in data.dungeons" :key="idx">
					<br>
					<span class="pl-4">{{dungeon}}: {{times}}</span>
				</span>
			</b-list-group-item>
			<b-list-group-item>
				Quests({{data.questsAmount}}):
				<span v-for="(quest,idx) in data.quests" :key="idx">
					<br>
					<span class="pl-4"><a :href="`https://wynncraft.gamepedia.com/${quest}`" target="_blank">{{quest}}</a></span>
				</span>
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
export default {
	props: ['classes'],
	data() {
		let cur = Object.keys(this.classes)[0]
		return {
			cur,
			data: this.classes[cur]
		}
	},
	methods: {
		select(name) {
			this.cur = name
			this.data = this.classes[name]
		}
	},
	filters: {
		toHours(min) {
			return Math.floor(min / 60)
		}
	}
}
</script>
<style scoped>
.hl{
	flex-direction: row;
}
.list-group-item{
	flex: 1;
}
</style>
