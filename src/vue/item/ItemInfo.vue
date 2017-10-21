<template>
	<b-col class="item" md="6">
		<b-row class="p-2 pt-4">
			<b-col class="text-center">
				<h3 :class="item.tier">{{item.name}}</h3>
			</b-col>
		</b-row>
		<b-row class="pl-2" v-if="item.attackSpeed">
			<b-col>
				<span>{{item.attackSpeed | titleCase}} Attack Speed</span>
			</b-col>
		</b-row>
		<b-row class="pl-2">
			<b-col class="neutual">
				Neutral Damage: {{item.damage}}
			</b-col>
		</b-row>
		<b-row class="pl-2" v-for="(v,el) in elDamages" :key="el">
			<b-col>
				<span :class="el" class="capitalize">{{el}}</span>
				<span>Damage: {{v}}</span>
			</b-col>
		</b-row>
		<b-row class="pl-2" v-for="(v,el) in elDefences" :key="el">
			<b-col>
				<span :class="el" class="capitalize">{{el}}</span>
				<span>Defense: {{v}}</span>
			</b-col>
		</b-row>
		<b-row class="pl-2 pt-2">
			<b-col class="requirement">
				Class Req: 
				<template v-if="item.type==='Wand'">Mage/Dark Wizard</template>
				<template v-if="item.type==='Bow'">Archer/Hunter</template>
				<template v-if="item.type==='Dagger'">Assassin/Ninja</template>
				<template v-if="item.type==='Spear'">Warrior/Knight</template>
			</b-col>
		</b-row>
		<b-row class="pl-2">
			<b-col class="requirement">
				Level: {{item.level}}
			</b-col>
		</b-row>
		<b-row class="pl-2" v-if="item.quest">
			<b-col class="requirement">
				Quest Req: {{item.quest}}
			</b-col>
		</b-row>
		<b-row class="pl-2" v-for="(req,type) in reqPoints" :key="type">
			<b-col class="requirement capitalize">
				{{type}} Min: {{req}}
			</b-col>
		</b-row>
	</b-col>
</template>
<script>
import _ from 'lodash'
import changeCase from 'change-case'

export default {
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	filters: changeCase,
	computed: {
		elDamages() {
			let types = ['fire', 'water', 'air', 'thunder', 'earth']
			let obj = {}
			for (let type of types) {
				if (this.item[`${type}Damage`] && this.item[`${type}Damage`] !== '0-0') {
					obj[type] = this.item[`${type}Damage`]
				}
			}
			return obj
		},
		elDefences() {
			let types = ['fire', 'water', 'air', 'thunder', 'earth']
			let obj = {}
			for (let type of types) {
				if (this.item[`${type}Defense`] && this.item[`${type}Defense`] !== '0-0') {
					obj[type] = this.item[`${type}Defense`]
				}
			}
			return obj
		},
		reqPoints() {
			let types = ['strength', 'dexterity', 'intelligence', 'agility', 'defense']
			let obj = {}
			for (let type of types) {
				if (this.item[type] > 0) {
					obj[type] = this.item[type]
				}
			}
			return obj
		}
	}
}
</script>

<style scoped>
.item{
	/* item card style: https://wynndata.tk/ */
	background-color: #110110;
	color: #AAA;
	border: 3px solid #2C0860;
	box-shadow: 4px 0 0 #110110, -4px 0 #110110, 0 4px 0 #110110, 0 -4px 0 #110110;
}
.itemimg{
	width: 64px;
}

.Mythic{
	color: #A0A;
}
.Legendary{
	color: #5FF;
}
.Rare{
	color: #F5F;
}
.Set{
	color: #0A0;
}
.Unique{
	color: #FF5;
}
.Normal{
	color: #FFF;
}

.fire{
	color: #F55;
}
.fire::before{
	content: '✹ ';
}
.water{
	color: #5FF;
}
.water::before{
	content: '❉ ';
}
.air{
	color: #FFF;
}
.air::before{
	content: '❋ ';
}
.thunder{
	color: #FF5;
}
.thunder::before{
	content: '✦ ';
}
.earth{
	color: #0A0;
}
.earth::before{
	content: '✤ ';
}
.neutual{
	color: #FA0;
}
.neutual::before{
	content: '✤ ';
}

.requirement::before{
	color: #5F5;
	content: '✔ ';
}
</style>
