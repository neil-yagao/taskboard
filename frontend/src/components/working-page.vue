<template>
<el-container class="full-screen white-background">
	<el-header style="height:4vh">
		<common-header/>
	</el-header>
	<el-main style="min-height:90vh;max-height:93vh;overflow-y:auto;margin-top:1vh">
    <router-view/>
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
	created() {
		let username = this.$store.state.user.username;
		if (username || !this.$store.state.hasLogin) {
			this.$store.commit('setLoginUser', {
					_id: localStorage.getItem('userid'),
					username: localStorage.getItem('username')
			})
		}
	}
}
</script>
