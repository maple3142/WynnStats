<template>
	<b-col>
		<!--class tabs-->
		<b-nav justified
		       tabs
		       class="pb-2">
			<b-nav-item v-for="(cls,idx) in classes"
			            :key="cls.name"
			            :active="idx===cur"
			            @click="select(idx)"
			            class="capitalize">{{ cls.name | strip }} (Lv.{{cls.level}})</b-nav-item>
		</b-nav>

		<!--xp-->
		<b-progress :max="100">
			<b-progress-bar :value="data.professions.combat.xp">
				XP: {{ data.professions.combat.xp }}%
			</b-progress-bar>
		</b-progress>

		<!--skills-->
		<b-list-group class="hl text-center pt-2">
			<b-list-group-item>
				✤Strength:
				<b>{{data.skills.strength}}</b>
			</b-list-group-item>
			<b-list-group-item>
				✦Dexterity:
				<b>{{data.skills.dexterity}}</b>
			</b-list-group-item>
			<b-list-group-item>
				❉Intelligence:
				<b>{{data.skills.intelligence}}</b>
			</b-list-group-item>
			<b-list-group-item>
				✹Defense:
				<b>{{data.skills.defense}}</b>
			</b-list-group-item>
			<b-list-group-item>
				❋Agility:
				<b>{{data.skills.agility}}</b>
			</b-list-group-item>
		</b-list-group>

		<!--statistics-->
		<b-list-group>
			<b-list-group-item>
				Blocks walked: {{data.blocksWalked}}
			</b-list-group-item>
			<b-list-group-item>
				Chests found: {{data.chestsFound}}
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
				Mobs killed: {{data.mobsKilled}}
			</b-list-group-item>
			<b-list-group-item>
				Playtime: {{data.playtime | toHours}} hours
			</b-list-group-item>
			<b-list-group-item>
				PvP killed: {{data.pvp.kills}}
			</b-list-group-item>
			<b-list-group-item>
				PvP deaths: {{data.pvp.deaths}}
			</b-list-group-item>
			<b-list-group-item>
				Dungeons({{data.dungeons.completed}}):
				<span v-for="dungeon in data.dungeons.list"
				      :key="dungeon.name">
					<br>
					<span class="pl-4">{{dungeon.name}}: {{dungeon.completed}}</span>
				</span>
			</b-list-group-item>
			<b-list-group-item>
				Quests({{data.quests.completed}}):
				<span v-for="quest in data.quests.list"
				      :key="quest">
					<br>
					<span class="pl-4">
						<BlankLink :href="`https://wynncraft.gamepedia.com/${quest}`">{{quest}}</BlankLink>
					</span>
				</span>
			</b-list-group-item>
		</b-list-group>
	</b-col>
</template>
<script>
import BlankLink from '../widget/BlankLink'
export default {
	props: {
		classes: Array
	},
	data() {
		let cur = 0
		return {
			cur,
			data: this.classes[cur]
		}
	},
	methods: {
		select(idx) {
			this.cur = idx
			this.data = this.classes[this.cur]
		}
	},
	filters: {
		strip(s) {
			let lch = s.charCodeAt(s.length - 1)
			if (lch >= 48 && lch <= 57) {
				//is number
				return s.slice(0, -1)
			}
			return s
		}
	},
	components: { BlankLink }
}
</script>