<template>
	<div>
		<b-row class="justify-content-md-center p-2">
			<b-col md="8" class="text-center">
				<b-row class="p-4">
					<b-col>
						<h3>About WynnStats</h3>
						<p>
							<b>WynnStats</b> is a serverless client which can view
							<BlankLink href="https://wynncraft.com/">WynnCraft</BlankLink> statistics.
							<br> It is open source on
							<BlankLink href="https://github.com/maple3142/wynnstats">
								<i class="fa fa-github" aria-hidden="true"></i>GitHub</BlankLink>, everyone can contribute to it.
							<br> Created by
							<b-link to="/player/maple3142">maple3142</b-link>
							<br>
							<BlankLink href="https://forums.wynncraft.com/threads/unoffical-wynnstats.205622/">Forum thread</BlankLink>
						</p>
					</b-col>
				</b-row>
				<b-row class="p-4">
					<b-col>
						<h3>What's tools is used?</h3>
						<p>
							JavaScript framework:
							<BlankLink href="https://github.com/vuejs/vue">Vue.js</BlankLink>
							<br> UI framework:
							<BlankLink href="https://github.com/bootstrap-vue/bootstrap-vue/">BootstrapVue</BlankLink>
							<br> Bundler:
							<BlankLink href="https://github.com/webpack/webpack">webpack</BlankLink>
							<br> And many tools in
							<BlankLink href="https://github.com/maple3142/WynnStats/blob/master/package.json">package.json</BlankLink>
						</p>
					</b-col>
				</b-row>
				<b-row class="p-4">
					<b-col>
						<a href="javascript:void(0)" @click="clear">
							<i class="fa fa-remove" aria-hidden="true"></i> Clear cache
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
