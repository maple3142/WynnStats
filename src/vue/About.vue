<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8" class="text-center">
				<b-row class="p-4">
					<b-col>
						<h3>About WynnStats</h3>
						<p>
							<b>WynnStats</b> is a serverless client which can view
							<blank-link href="https://wynncraft.com/">
								WynnCraft
							</blank-link>
							statistics. <br />
							It is open source on
							<blank-link href="https://github.com/maple3142/wynnstats">
								<i class="fa fa-github" aria-hidden="true" /> GitHub </blank-link
							>, everyone can contribute to it. <br />
							Created by
							<b-link to="/player/maple3142">
								maple3142
							</b-link>
							<br />
							<blank-link href="https://forums.wynncraft.com/threads/unoffical-wynnstats.205622/">
								Forum thread
							</blank-link>
						</p>
					</b-col>
				</b-row>
				<b-row class="p-4">
					<b-col>
						<h3>What's tools is used?</h3>
						<p>
							JavaScript framework:
							<blank-link href="https://github.com/vuejs/vue">
								Vue.js
							</blank-link>
							<br />
							UI framework:
							<blank-link href="https://github.com/bootstrap-vue/bootstrap-vue/">
								BootstrapVue
							</blank-link>
							<br />
							Bundler:
							<blank-link href="https://github.com/webpack/webpack">
								webpack
							</blank-link>
							<br />
							And many tools in
							<blank-link href="https://github.com/maple3142/WynnStats/blob/master/package.json">
								package.json
							</blank-link>
						</p>
					</b-col>
				</b-row>
				<b-row class="p-4">
					<b-col>
						<a href="javascript:void(0)" @click="clear">
							<i class="fa fa-remove" aria-hidden="true" /> Clear cache
						</a>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import BlankLink from './widget/BlankLink'
export default {
	components: { BlankLink },
	methods: {
		clear() {
			localStorage.clear()
			location.reload(true)
		}
	}
}
</script>
