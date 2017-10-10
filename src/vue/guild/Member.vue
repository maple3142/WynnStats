<template>
	<b-col>
		<b-row class="pb-2">
			<!--owner-->
			<b-col>
				<h4>♔ Owner</h4>
				<PageList :list="owner" size="sm">
					<template scope="row">
						<Id :id="row.value" />
					</template>
				</PageList>
			</b-col>
		</b-row>
		<!--upper row-->
		<b-row>
			<b-col cols="12" md="6">
				<!--chief-->
				<h5>♕ Chief({{chief.length}})</h5>
				<PageList :list="chief" size="sm">
					<template scope="row">
						<Id :id="row.value" />
					</template>
				</PageList>
			</b-col>
			<b-col cols="12" md="6">
				<!--captain-->
				<h5>♖ Captain({{captain.length}})</h5>
				<PageList :list="captain" size="sm">
					<template scope="row">
						<Id :id="row.value" />
					</template>
				</PageList>
			</b-col>
		</b-row>
		<!--bottom row-->
		<b-row>
			<b-col cols="12" md="6">
				<!--recruiter-->
				<h5>♘ Recruiter({{recruiter.length}})</h5>
				<PageList :list="recruiter" size="sm">
					<template scope="row">
						<Id :id="row.value" />
					</template>
				</PageList>
			</b-col>
			<b-col cols="12" md="6">
				<!--recruit-->
				<h5>♙ Recruit({{recruit.length}})</h5>
				<PageList :list="recruit" size="sm">
					<template scope="row">
						<Id :id="row.value" />
					</template>
				</PageList>
			</b-col>
		</b-row>
	</b-col>
</template>
<script>
import _ from 'lodash'

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
			return _(this.members).filter({ rank: 'OWNER' }).map('name').value()
		},
		captain() {
			return _(this.members).filter({ rank: 'CAPTAIN' }).map('name').value()
		},
		chief() {
			return _(this.members).filter({ rank: 'CHIEF' }).map('name').value()
		},
		recruit() {
			return _(this.members).filter({ rank: 'RECRUIT' }).map('name').value()
		},
		recruiter() {
			return _(this.members).filter({ rank: 'RECRUITER' }).map('name').value()
		}
	}
}
</script>

