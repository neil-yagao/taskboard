<template>
<div class="float-right margin-to-middle">
	<el-dropdown>
		<span class="el-dropdown-link">
        欢迎回来：{{$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item @click.native="logout()">登出</el-dropdown-item>

		</el-dropdown-menu>
	</el-dropdown>
</div>
</template>
<script>
export default {
	name: 'login-right',
	data() {
		return {

		}
	},
	methods: {
		logout() {
			this.eraseCookie('USERNAME');
			this.eraseCookie('USER_ID');
			this.$store.commit('logoutUser')
		}
	}
}
</script>
