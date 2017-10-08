<template>
	<b-col>
		<b-row>
			<!--owner-->
			<b-col class="p-0">
				<b-card>
					<h4>♔ Owner</h4>
					<id :id="owner.name" />
				</b-card>
			</b-col>
		</b-row>
		<!--upper row-->
		<b-row>
			<b-card-group class="w-100">
				<!--chief-->
				<b-card>
					<h5>♕ Chief</h5>
					<id v-for="player in chief" :key="player.name" :id="player.name" />
				</b-card>
				<!--captain-->
				<b-card>
					<h5>♖ Captain</h5>
					<id v-for="player in captain" :key="player.name" :id="player.name" />
				</b-card>
			</b-card-group>
		</b-row>
		<!--bottom row-->
		<b-row>
			<b-card-group class="w-100">
				<!--recruiter-->
				<b-card>
					<h5>♘ Recruiter</h5>
					<id v-for="player in recruiter" :key="player.name" :id="player.name" />
				</b-card>
				<!--recruit-->
				<b-card>
					<h5>♙ Recruit</h5>
					<id v-for="player in recruit" :key="player.name" :id="player.name" />
				</b-card>
			</b-card-group>
		</b-row>
	</b-col>
</template>
<script>
import _ from 'lodash'

import id from './id'
export default {
	props: ['members'],
	data() {
		let owner = _.find(this.members, { rank: 'OWNER' })//only one owner
		let captain = _.filter(this.members, { rank: 'CAPTAIN' })
		let chief = _.filter(this.members, { rank: 'CHIEF' })
		let recruit = _.filter(this.members, { rank: 'RECRUIT' })
		let recruiter = _.filter(this.members, { rank: 'RECRUITER' })
		return { owner, captain, chief, recruit, recruiter }
	},
	components: { id }
}
</script>

