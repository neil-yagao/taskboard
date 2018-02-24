<template>
<div>
	<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
		{{tag}}
	</el-tag>
	<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" :maxlength="20">
	</el-input>
	<el-button v-else class="button-new-tag" size="small" @click="showInput">{{placeholder}}</el-button>
</div>
</template>
<style scope>
.el-tag+.el-tag {
	margin-left: 10px;
}

.button-new-tag {
	margin-left: 10px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}

.input-new-tag {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}
</style>
<script>
export default {
	data() {
		return {
			dynamicTags: this.value,
			inputVisible: false,
			inputValue: ''
		};
	},
	methods: {
		handleClose(tag) {
			this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
		},
		showInput() {
			this.inputVisible = true;
			this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus();
			});
		},
		handleInputConfirm() {
			let inputValue = this.inputValue;
			if (inputValue) {
				this.dynamicTags.push(inputValue);
			}
			this.$emit('input', this.dynamicTags);
			this.inputVisible = false;
			this.inputValue = '';
		}
	},
	props: {
		value: {
			type: Array,
			default: []
		},
		placeholder: {
			type: String,
			default: '点我添加'
		}
	}
}
</script>
