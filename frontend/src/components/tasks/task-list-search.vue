<template>
<el-input v-model="search" :placeholder="placeholder" size="large">
	<el-button type="primary" class="large-input-suffix" slot="suffix" @click="doSearch()">{{btnText}}</el-button>
</el-input>
</template>
<style>
.el-input--large input[type='text'] {
	font-size: 26px;
	height: 60px;
}

.large-input-suffix {
	font-size: 24px;
	margin-top: 6px;
	padding-top: 10px;
}
</style>
<script>
export default {
	name: 'search-input',
	data() {
		return {
			search: ''
		}
	},
	methods: {
		doSearch() {
			this.$emit('search', {
				name: {
					$regex: '.*' + this.search + ".*"
				}
			})
		}
	},
	props: {
		btnText: {
			type: String,
			default: "搜索"
		},
		placeholder: {
			type: String,
			default: ''
		}
	}
}
</script>
