<template>
	<b-col>
		<b-row class="pb-2">
			<!--owner-->
			<b-col>
				<h4 id="Owner">♔ Owner</h4>
				<page-list :list="owner"
				           size="sm">
					<template slot-scope="row">
						<id :id="row.value" />
					</template>
				</page-list>
			</b-col>
		</b-row>
		<!--upper row-->
		<b-row>
			<b-col cols="12"
			       md="6">
				<!--chief-->
				<h5 id="Chief">♕ Chief({{chief.length}})</h5>
				<page-list :list="chief"
				           size="sm" class="member-block">
					<template slot-scope="row">
						<id :id="row.value" />
					</template>
				</page-list>
			</b-col>
			<b-col cols="12"
			       md="6">
				<!--captain-->
				<h5 id="Captain">♖ Captain({{captain.length}})</h5>
				<page-list :list="captain"
				           size="sm" class="member-block">
					<template slot-scope="row">
						<id :id="row.value" />
					</template>
				</page-list>
			</b-col>
		</b-row>
		<!--bottom row-->
		<b-row>
			<b-col cols="12"
			       md="6">
				<!--recruiter-->
				<h5 id="Recruiter">♘ Recruiter({{recruiter.length}})</h5>
				<page-list :list="recruiter"
				           size="sm" class="member-block">
					<template slot-scope="row">
						<id :id="row.value" />
					</template>
				</page-list>
			</b-col>
			<b-col cols="12"
			       md="6">
				<!--recruit-->
				<h5 id="Recruit">♙ Recruit({{recruit.length}})</h5>
				<page-list :list="recruit"
				           size="sm" class="member-block">
					<template slot-scope="row">
						<id :id="row.value" />
					</template>
				</page-list>
			</b-col>
		</b-row>
	</b-col>
</template>
<script>
import Id from '../widget/Id'
import PageList from '../widget/PageList'

export default {
	props: {
		members: Array
	},
	// data() {
	// 	let owner = _.find(this.members, { rank: 'OWNER' })//only one owner
	// 	let captain = _.filter(this.members, { rank: 'CAPTAIN' })
	// 	let chief = _.filter(this.members, { rank: 'CHIEF' })
	// 	let recruit = _.filter(this.members, { rank: 'RECRUIT' })
	// 	let recruiter = _.filter(this.members, { rank: 'RECRUITER' })
	// 	return { owner, captain, chief, recruit, recruiter }
	// },
	components: { Id, PageList },
	computed: {
		owner() {
			return this.members.filter(x => x.rank === 'OWNER').map(x => x.name)
		},
		captain() {
			return this.members.filter(x => x.rank === 'CAPTAIN').map(x => x.name)
		},
		chief() {
			return this.members.filter(x => x.rank === 'CHIEF').map(x => x.name)
		},
		recruit() {
			return this.members.filter(x => x.rank === 'RECRUIT').map(x => x.name)
		},
		recruiter() {
			return this.members.filter(x => x.rank === 'RECRUITER').map(x => x.name)
		}
	}
}
</script>
<style scoped>
.member-block{
	height: 550px;
}
</style>
