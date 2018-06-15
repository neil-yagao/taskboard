<template>
	<div class="grey-background">
		<el-card class="box-card">
			<div class="mb-4">
				<a href="/#/" class="h1">
					<b>Task Board</b>
					<span class="h5 ml-2">您升级打怪的乐土</span>
				</a>
			</div>
			<hr/>
			<el-form ref="user" :model="user" :rules="rules" class="mt-4">
				<el-form-item prop="email">
					<el-input v-model="user.email" placeholder="您的电邮地址"></el-input>
				</el-form-item>
				<el-form-item prop="username" class="mt-2">
					<el-input v-model="user.username" placeholder="响亮的名号"></el-input>
				</el-form-item>
				<el-form-item prop="password" class="mt-2">
					<el-input v-model="user.password" type="password" placeholder="适合您的密码"></el-input>
				</el-form-item>
				<el-form-item class="mt-2">
					<el-button type="success" class="float-right" @click="onSubmit" plain>立即注册</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script>
var md5 = require("./md5").md5;
import loginMixin from "./login-mixin";
export default {
	name: "login-main",
	mixins: [loginMixin],
	data() {
		return {
			user: {
				username: "",
				password: "",
				email: ""
			},
			rules: {
				username: [
					{
						required: true,
						min: 6,
						message: "请输入一个不少于6个字符的用户名",
						trigger: "blur"
					}
				],
				email: [
					{
						required: true,
						type: "email",
						message: "请输入一个有效的邮箱",
						trigger: "blur"
					}
				],
				password: [
					{
						required: true,
						min: 6,
						message: "请输入一个不少于6个字符的密码",
						trigger: "blur"
					}
				]
			}
		};
	},
	methods: {
		onSubmit() {
			console.log("md5", md5);
			this.$refs["user"].validate(valid => {
				if (valid) {
					this.user.password = md5(this.user.password);
					return this.axios.post("/users", this.user).then(
						res => {
							this.successAndRedirect(res, "注册成功，开始发布或者接取任务吧！").then(
								() => {
									this.user = {
										username: "",
										password: "",
										email: ""
									};
								}
							);
							return res;
						},
						error => {
							console.log("unkown error", error);
						}
					);
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		}
	}
};
</script>
<style>
.box-card {
	width: 40vw;
	height: 60vh;
	margin-right: auto;
	margin-left: auto;
	margin-top: 15vh;
}
</style>
