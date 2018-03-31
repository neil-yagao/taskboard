<template>
<div class="container">
	<div class="jumbotron"
	     style="background:none">
		<h1 class="display-4">请告诉我们您需要完成什么？</h1>
		<p class="lead">只需要提供最基本的信息，就可以为您快速发布您的任务！</p>
		<hr class="my-4">
		<el-form :model="project"
		         :rules="rules"
		         label-position="top"
		         name="new-task"
		         ref="new-task">
			<el-form-item label="请为您的任务取个响亮的名字"
			              prop="name">
				<el-input placeholder="例如：翻译一篇英文文档"
				          v-model="project.name"
				          clearable></el-input>
			</el-form-item>
			<el-form-item>
				<h3>说说看您的任务的详细情况吧</h3>
				<span>通常我们会建议您留下这些：一点点您自己的情况，详细的说明下您的最终目标以及您已经完成了什么。</span>
			</el-form-item>
			<el-form-item prop="description">
				<el-input type="textarea"
				          placeholder="请描述一下您的任务。。。"
				          v-model="project.description"
				          :rows="5"
				          clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-upload class="upload-line"
				           drag
				           action="https://jsonplaceholder.typicode.com/posts/"
				           multiple>
					<el-button style="margin:0.2rem 15rem 0 0.2rem"><i class="el-icon-upload el-icon--left"
						   style="font-size:14px;margin:0;line-height:0"></i>上传</el-button>
					<el-button type="text"><span>或许上传点文件可以帮助你更加清晰的描述您的任务？</span></el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="要完成您任务的哪些技能必须要点呢？">
				<tag-input placeholder="+技能"
				           v-model="project.skills" />
			</el-form-item>
			<el-form-item label="您预计要为此花费多少？"
			              prop="budget">
				<el-input placeholder="当然越少越好啦！"
				          v-model="project.budget"
				          clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="warning"
				           @click="onSubmit"
				           plain>立即创建</el-button>
			</el-form-item>
		</el-form>
	</div>
	<login-required-modal ref="requireLogin"
	                      title="距离发布只差一步啦!" />
</div>
</template>
<script>
import TagInput from '../general/tag-input.vue';
import LoginRequiredModal from '../login-required-modal.vue';
import moment from 'moment'
export default {
	name: 'new-task',
	data() {
		return {
			project: {
				name: '',
				budget: '',
				skills: [],
				description: ''
			},
			rules: {
				name: [{
					required: true,
					message: '请输入任务名称',
					trigger: 'blur'
				}],
				budget: [{
					required: true,
					message: '请输入任务预计的花费',
					trigger: 'blur'
				}],
				description: [{
						required: true,
						message: '请输入任务描述',
						trigger: 'blur'
					},
					{
						min: 50,
						message: '至少五十个字哦',
						trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
		onSubmit() {

			this.$refs['new-task'].validate((valid) => {
				console.log('validating')
				if (!valid) {
					console.log('error submit!!');
					return false;
				} else {
					if (!this.$store.state.hasLogin) {
						this.$refs['requireLogin'].doShow().then(() => {
							this.doCreateTask();
						})
					} else {
						this.doCreateTask();
					}
				}
			});
		},
		doCreateTask() {
			this.project.creator = this.$store.state.user;
			this.axios.post('/tasks', this.project).then((res) => {
				if (res.success) {
					this.project = {
						name: '',
						budget: '',
						skills: [],
						description: '',
						creator: ''
					}
					this.$messageBox.success('已为您添加任务成功！', '添加成功');
				} else {
					this.$messageBox.error(res.msg)
				}
			})
		}
	},
	components: {
		TagInput,
		LoginRequiredModal
	}
}
</script>
<style scope>
div.el-upload-dragger {
	width: 60rem;
	height: 3rem;
	text-align: left;
}

form[name='new-task'] label.el-form-item__label {
	font-size: 1.75rem;
	margin-bottom: .5rem;
	font-family: inherit;
	font-weight: 500;
	line-height: 1.2;
	color: inherit;
}
</style>
