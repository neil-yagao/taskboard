<template>
<el-container>
	<el-header>
		<common-header/>
	</el-header>
	<el-main>
		<router-view/>
	</el-main>
	<el-footer>
	</el-footer>
</el-container>
</template>
<script>
import CommonHeader from './header/common-header.vue'
export default {
	name: 'wokring-main',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
			activeIndex: '0'
		}

	},
	methods: {
		handleSelect(event) {
			console.log('event', event)
		}
	},
	components: {
		CommonHeader
	}
}
</script>
