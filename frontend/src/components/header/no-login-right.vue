<template>
<ul class="float-right margin-to-middle" @click.native="clickItem($event)" :router="false">
	<el-button class="operating-button" type="text">注册</el-button>
	<el-button class="operating-button" type="text">登录</el-button>
</ul>
</template>
<script>
export default {
	name: 'no-login-right',
	data() {
		return {}
	},
	methods: {
		clickItem(event) {
			event.preventDefault();
		}
	}
}
</script>
<style>
.operating-button {
	font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '\5FAE\8F6F\96C5\9ED1', Arial, sans-serif;
	font-size: 20px;
	padding: 0 8px;
	border: 0;
	font-weight: 400;
	color: #1f2836;
}

.operating-button:hover {
	color: #22d1e0
}
</style>
