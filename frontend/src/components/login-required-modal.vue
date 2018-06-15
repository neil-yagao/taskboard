<template>
<el-dialog :title="title"
           :visible.sync="loginShow"
           :close-on-click-modal="false">

	<login-frame redirect="0"
	             style="margin-top:-18vh;background-color:#fff" />

</el-dialog>
</template>
<script>
import LoginFrame from './login.vue'
export default {
	name: 'login-required',
	data() {
		return {
			active: 'register',
			loginShow: false,
			resolve: ''
		}
	},
	props: {
		title: {
			type: String,
			required: true
		}
	},
	methods: {
		doShow() {
			this.loginShow = true;
			return new Promise((resolve, reject) => {
				this.resolve = resolve;
			})
		}
	},
	components: {
		LoginFrame
	},
	watch: {
		'$store.state.hasLogin': function(val) {
			if (val) {
        this.loginShow = false;
        if(this.resolve)
				this.resolve();
			}
		}
	}
}
</script>
