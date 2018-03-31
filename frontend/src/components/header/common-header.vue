<template>
<el-row>
	<el-col :span="4">
		<h2 class="margin-to-middle"><i class="el-icon-info"></i>&nbsp;Task Board</h2>
	</el-col>
	<el-col :span="20">
		<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#22d1e0">
			<el-menu-item index="/task/new-task">
				<span class="menu-text-base">发布任务</span></el-menu-item>
			<el-menu-item index="/task/accept-task"><span class="menu-text-base">认领任务</span></el-menu-item>
			<el-menu-item index="/task/how-to"><span class="menu-text-base">我该如何下手？</span></el-menu-item>
			<no-login-right v-if="!$store.state.hasLogin" />
			<login-right v-if="$store.state.hasLogin" />
		</el-menu>
	</el-col>
</el-row>
</template>
<script>
import NoLoginRight from './no-login-right.vue'
import LoginRight from './login-right.vue'
export default {
	name: 'no-login-header',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
			activeIndex: '0'
		}
	},
	methods: {
		handleSelect(event) {
			console.log('event', event)
			this.$router.push(event)
		}
	},
	components: {
		NoLoginRight,
		LoginRight
	}
}
</script>
<style>
.el-menu-item.is-active span {
	color: #22d1e0;
}
</style>
