<template>
	<b-col>
		<!--class tabs-->
		<b-nav justified tabs class="pb-2">
			<b-nav-item v-for="(cls,name) in classes" :key="name" :active="name===cur" @click="select(name)">{{name}}</b-nav-item>
		</b-nav>

		<!--xp-->
		<b-progress :max="100">
			<b-progress-bar :value="data.xp">
				XP: {{ data.xp }}%
			</b-progress-bar>
		</b-progress>

		<!--skills-->
		<b-list-group class="hl text-center pt-2">
			<b-list-group-item>
				✤Strength: <b>{{data.skills.Strength}}</b>
			</b-list-group-item>
			<b-list-group-item>
				✦Dexterity: <b>{{data.skills.Dexterity}}</b>
			</b-list-group-item>
			<b-list-group-item>
				❉Intelligence: <b>{{data.skills.Intelligence}}</b>
			</b-list-group-item>
			<b-list-group-item>
				✹Defense: <b>{{data.skills.Defense}}</b>
			</b-list-group-item>
			<b-list-group-item>
				❋Agility: <b>{{data.skills.Agility}}</b>
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
				<span v-for="(times,dungeon) in data.dungeons" :key="dungeon">
					<br>
					<span class="pl-4">{{dungeon}}: {{times}}</span>
				</span>
			</b-list-group-item>
			<b-list-group-item>
				Quests({{data.questsAmount}}):
				<span v-for="quest in data.quests" :key="quest">
					<br>
					<span class="pl-4">
						<a :href="`https://wynncraft.gamepedia.com/${quest}`">{{quest}}</a>
					</span>
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
