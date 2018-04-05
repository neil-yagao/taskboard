<template>
<el-container class="full-screen white-background">
	<el-header style="height:4vh">
		<common-header/>
	</el-header>
	<el-main style="overflow-y:hidden;">
		<el-card style="min-height:90vh;max-height:93vh;overflow-y:auto">
			<router-view/>
		</el-card>
	</el-main>
</el-container>
</template>
<script>
import CommonHeader from './header/common-header.vue'
export default {
	name: 'wokring-main',
	data() {
		return {

		}
	},
	methods: {
		handleSelect(event) {
			console.log('event', event)
		}
	},
	components: {
		CommonHeader
	},
	mounted() {
		let username = this.readCookie('USERNAME');
		if (username && !this.$store.state.hasLogin) {
			this.$store.commit('setLoginUser', {
				msg: {
					_id: this.readCookie('USER_ID'),
					username: username
				}
			})
		}
	}
}
</script>
