<template>
	<b-col class="item" :md="md" :cols="cols">
		<b-row class="p-4">
			<b-col class="text-center">
				<h3 :class="item.tier">{{item.name}}</h3>
			</b-col>
		</b-row>
		<b-row class="pl-4">
			<b-col>
				<b-row v-if="item.attackSpeed">
					<b-col>
						<span>{{item.attackSpeed | titleCase}} Attack Speed</span>
					</b-col>
				</b-row>
				<b-row class="pt-2"></b-row>
				<b-row v-if="item.health">
					<b-col>
						<span class="health">Health: {{item.health}}</span>
					</b-col>
				</b-row>
				<b-row v-if="item.damage&&item.damage!=='0-0'">
					<b-col class="neutual">
						Neutral Damage: {{item.damage}}
					</b-col>
				</b-row>
				<b-row v-for="(v,el) in elDamages" :key="el">
					<b-col>
						<span :class="el" class="capitalize">{{el}}</span>
						<span>Damage: {{v}}</span>
					</b-col>
				</b-row>
				<b-row v-for="(v,el) in elDefences" :key="el">
					<b-col>
						<span :class="el" class="capitalize">{{el}}</span>
						<span>Defense: {{v}}</span>
					</b-col>
				</b-row>
				<b-row class="pt-2"></b-row>
				<b-row v-if="['Wand','Bow','Dagger','Spear'].includes(item.type)">
					<b-col class="requirement">
						Class Req: 
						<template v-if="item.type==='Wand'">Mage/Dark Wizard</template>
						<template v-if="item.type==='Bow'">Archer/Hunter</template>
						<template v-if="item.type==='Dagger'">Assassin/Ninja</template>
						<template v-if="item.type==='Spear'">Warrior/Knight</template>
					</b-col>
				</b-row>
				<b-row >
					<b-col class="requirement">
						Level: {{item.level}}
					</b-col>
				</b-row>
				<b-row v-if="item.quest">
					<b-col class="requirement">
						Quest Req: {{item.quest}}
					</b-col>
				</b-row>
				<b-row v-for="(req,type) in reqPoints" :key="type">
					<b-col class="requirement capitalize">
						{{type}} Min: {{req}}
					</b-col>
				</b-row>
				<b-row class="pt-2"></b-row>
				<b-row v-for="(v,k) in positiveID" :key="k">
					<b-col class="capitalize">
						<span>{{k | format}}:</span>
						<template v-if="!item.identified">
							<span class="positive">{{getFormat(k,v.min)}}</span>
							~
							<span class="positive">{{getFormat(k,v.max)}}</span>
						</template>
						<span v-else class="positive">{{getFormat(k,v.base)}}</span>
					</b-col>
				</b-row>
				<b-row v-for="(v,k) in negativeID" :key="k">
					<b-col class="capitalize">
						<span>{{k | format}}:</span>
						<template v-if="!item.identified">
							<span class="negative">{{getFormat(k,v.min)}}</span>
							~
							<span class="negative">{{getFormat(k,v.max)}}</span>
						</template>
						<span v-else class="negative">{{getFormat(k,v.base)}}</span>
					</b-col>
				</b-row>
				<b-row v-for="(v,k) in bonusDamage" v-if="v.base" :key="k">
					<b-col class="capitalize">
						<span :class="getClassFromBonus(k)">{{k | format}}</span>
						<span>Damage:</span>
						<template v-if="!item.identified">
							<span :class="v.min>0?'positive':'negative'">{{getFormat(k,v.min)}}</span>
							~
							<span :class="v.max>0?'positive':'negative'">{{getFormat(k,v.max)}}</span>
						</template>
						<span v-else :class="v.base>0?'positive':'negative'">{{getFormat(k,v.base)}}</span>
					</b-col>
				</b-row>
				<b-row v-for="(v,k) in bonusDefense" v-if="v.base" :key="k">
					<b-col class="capitalize">
						<span :class="getClassFromBonus(k)">{{k | format}}</span>
						<span>Defense:</span>
						<template v-if="!item.identified">
							<span :class="v.min>0?'positive':'negative'">{{getFormat(k,v.min)}}</span>
							~
							<span :class="v.max>0?'positive':'negative'">{{getFormat(k,v.max)}}</span>
						</template>
						<span v-else :class="v.base>0?'positive':'negative'">{{getFormat(k,v.base)}}</span>
					</b-col>
				</b-row>
				<b-row class="pt-2"></b-row>
				<b-row v-if="item.sockets">
					<b-col>
						[0/{{item.sockets}}] Powder Slots
					</b-col>
				</b-row>
				<b-row >
					<b-col :class="item.tier">
						{{item.tier}} Item
					</b-col>
				</b-row>
				<b-row v-if="item.restrictions">
					<b-col class="restrictions">
						{{item.restrictions}}
					</b-col>
				</b-row>
				<b-col class="pt-2"></b-col>
				<b-row v-if="full && item.addedLore">
					<b-col class="lore">{{item.addedLore}}</b-col>
				</b-row>
				<b-row v-if="!full" align-h="end">
					<b-col cols="6">
						<b-link :to="`/item/${item.name}`">show details...</b-link>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
		<b-row class="pb-4"></b-row>
	</b-col>
</template>
<script>
import _ from 'lodash'
import changeCase from 'change-case'

// provide by http://wynnapps.tk/
const damage = ['bonusFireDamage', 'bonusWaterDamage', 'bonusThunderDamage', 'bonusEarthDamage', 'bonusAirDamage']
const defense = ['bonusFireDefense', 'bonusWaterDefense', 'bonusThunderDefense', 'bonusEarthDefense', 'bonusAirDefense']
const idlist = ['healthRegen', 'manaRegen', 'damageBonus', 'spellDamage', 'lifeSteal', 'manaSteal', 'xpBonus', 'lootBonus', 'reflection', 'thorns', 'exploding', 'speed', 'poison', 'healthBonus', 'soulPoints', 'emeraldStealing', 'strengthPoints', 'intelligencePoints', 'dexterityPoints', 'agilityPoints', 'defensePoints', 'healthRegenRaw', 'spellDamageRaw', 'damageBonusRaw', 'attackSpeedBonus']
const formats = { 'healthRegen': '~%', 'manaRegen': '~/4s', 'damageBonus': '~%', 'spellDamage': '~%', 'lifeSteal': '~/4s', 'manaSteal': '~/4s', 'xpBonus': '~%', 'lootBonus': '~%', 'reflection': '~%', 'thorns': '~%', 'exploding': '~%', 'speed': '~%', 'attackSpeedBonus': '~ tier', 'poison': '~/3s', 'soulPoints': '~%', 'emeraldStealing': '~%', 'FireDefense': '~%', 'WaterDefense': '~%', 'AirDefense': '~%', 'ThunderDefense': '~%', 'EarthDefense': '~%', 'health': '~', 'strengthPoints': '~', 'dexterityPoints': '~', 'intelligencePoints': '~', 'agilityPoints': '~', 'defensePoints': '~', 'healthBonus': '~', 'damageBonusRaw': '~', 'spellDamageRaw': '~', 'bonusFireDefense': '~%', 'bonusWaterDefense': '~%', 'bonusThunderDefense': '~%', 'bonusEarthDefense': '~%', 'bonusAirDefense': '~%', 'bonusFireDamage': '~%', 'bonusWaterDamage': '~%', 'bonusThunderDamage': '~%', 'bonusEarthDamage': '~%', 'bonusAirDamage': '~%', 'healthRegenRaw': '~' }
const text = { 'healthRegen': 'Health Regen', 'manaRegen': 'Mana Regen', 'damageBonus': 'Melee Damage', 'spellDamage': 'Spell Damage', 'lifeSteal': 'Life Steal', 'manaSteal': 'Mana Steal', 'xpBonus': 'XP Bonus', 'lootBonus': 'Loot Bonus', 'reflection': 'Reflection', 'thorns': 'Thorns', 'exploding': 'Exploding', 'speed': 'Speed', 'poison': 'Poison', 'healthBonus': 'Health Bonus', 'soulPoints': 'Soul Point Regen', 'emeraldStealing': 'Stealing', 'strengthPoints': 'Strength', 'intelligencePoints': 'Intelligence', 'dexterityPoints': 'Dexterity', 'agilityPoints': 'Agility', 'defensePoints': 'Defense', 'healthRegenRaw': 'Health Regen', 'spellDamageRaw': 'Spell Damage', 'damageBonusRaw': 'Melee Damage', 'attackSpeedBonus': 'Attack Speed', 'bonusFireDamage': 'Fire', 'bonusWaterDamage': 'Water', 'bonusThunderDamage': 'Thunder', 'bonusEarthDamage': 'Earth', 'bonusAirDamage': 'Air', 'bonusFireDefense': 'Fire', 'bonusWaterDefense': 'Water', 'bonusThunderDefense': 'Thunder', 'bonusEarthDefense': 'Earth', 'bonusAirDefense': 'Air' }

export default {
	props: {
		item: {
			type: Object,
			required: true
		},
		full: {
			type: Boolean,
			default: false
		},
		md: {
			type: String,
			default: '6'
		},
		cols: {
			type: String,
			default: '12'
		}
	},
	filters: {
		...changeCase,
		format(k) {
			if (!(k in text)) {
				return k
			}
			return text[k]
		}
	},
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
		},
		ids() {
			return _.pickBy(this.item, (v, k) => idlist.includes(k))
		},
		positiveID() {
			return _(this.ids).pickBy(v => v > 0).mapValues(v => {
				return {
					min: Math.ceil(v * 0.3),
					base: v,
					max: Math.ceil(v * 1.3)
				}
			}).value()
		},
		negativeID() {
			return _(this.ids).pickBy(v => v < 0).mapValues(v => {
				return {
					min: Math.floor(v * 0.7),
					base: v,
					max: Math.floor(v * 1.3)
				}
			}).value()
		},
		bonusDamage() {
			return _(this.item).pickBy((v, k) => damage.includes(k)).mapValues(v => {
				return (v > 0 ?
					{
						min: Math.ceil(v * 0.3),
						base: v,
						max: Math.ceil(v * 1.3)
					} :
					{
						min: Math.floor(v * 0.7),
						base: v,
						max: Math.floor(v * 1.3)
					})
			}).value()
		},
		bonusDefense() {
			return _(this.item).pickBy((v, k) => defense.includes(k)).mapValues(v => {
				return (v > 0 ?
					{
						min: Math.ceil(v * 0.3),
						base: v,
						max: Math.ceil(v * 1.3)
					} :
					{
						min: Math.floor(v * 0.7),
						base: v,
						max: Math.floor(v * 1.3)
					})
			}).value()
		}
	},
	methods: {
		getFormat(type, value) {
			if (!(type in formats)) {
				return value
			}
			return formats[type].replace('~', value)
		},
		getClassFromBonus(bonus) {
			return bonus.replace(/(bonus|Damage|Defense)/g, '').toLowerCase()
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
	font-family: Nunito, sans-serif;
	font-weight: 700;
	text-shadow: 2px 2px 0 #2A2A2A;
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

.positive{
	color: #5F5;
}
.negative{
	color: #F55;
}

.restrictions{
	color: #F55;
}

.health{
	color: #A00;
}
.health::before{
	content: '❤ ';
}

.lore{
	color: #555;
	font-style: italic;
}
</style>
