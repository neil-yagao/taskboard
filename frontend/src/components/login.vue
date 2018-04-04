<template>
<div class="grey-background">
	<el-card class="box-card">
		<div class="row align-items-end"><span class="h1 col-9"><b>Task Board</b></span>
			<span class="h5 col">登录吧</span>
		</div>
		<hr class="mb-4 " />
		<el-form ref="user"
		         :model="user"
		         :rules="rules"
		         class="mt-4">
			<el-form-item prop="loginId">
				<el-input v-model="user.loginId"
				          placeholder="用户名/电邮地址"></el-input>
			</el-form-item>
			<el-form-item prop="password"
			              class="mt-2">
				<el-input v-model="user.password"
				          type="password"
				          placeholder="适合您的密码"></el-input>
			</el-form-item>
			<el-form-item class="mt-2">
				<el-button type="primary"
				           class="float-right ml-1"
				           @click="doLogin"
				           plain>登录</el-button>
				<el-button type="success"
				           class="float-right"
				           @click="$router.push('/register')"
				           plain>没有账号？注册一个吧</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</div>
</template>
<script>
var md5 = require('./md5').md5
import loginMixin from './login-mixin';

export default {
	name: 'login-frame',
	data() {
		return {
			user: {
				loginId: '',
				password: ''
			},
			rules: {}
		}
	},
	mixins: [loginMixin],
	methods: {
		doLogin() {
			this.axios.post('/users/login', {
				loginId: this.user.loginId,
				password: md5(this.user.password)
			}).then(res => {
				if (res.success) {
					this.successAndRedirect(res, '欢迎回来,' + res.msg.username)
				} else {
					this.failureWarning(res.msg)
				}
				return res;
			})
		}
	}
}
</script>
<style scoped>
.box-card {
	width: 40vw;
	height: 40vh;
	margin-right: auto;
	margin-left: auto;
	margin-top: 20vh;
}
</style>
