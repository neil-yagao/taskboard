<template>
<div class="container">
	<el-header>
		<task-search placeholder="搜搜看吧...." />
	</el-header>
	<el-container>
		<el-main>
			<task-brief v-for="task in tasks" :task="task" :key="task.id" @update-list="fetchTasks" />
		</el-main>
	</el-container>
</div>
</template>
<script>
import TaskSearch from './task-list-search.vue'
import TaskBrief from './task-brief.vue'
export default {
	name: 'task-list',
	data() {
		return {
			search: '',
			tasks: []
		}
	},
	components: {
		TaskSearch,
		TaskBrief
	},
	methods: {
		fetchTasks() {
			this.axios.get('/tasks').then(res => {
				this.tasks = res;
			})
		}
	},
	mounted() {
		this.fetchTasks();
	}
}
</script>

<style scoped>
.el-aside {
	background-color: #D3DCE6;
	color: #333;
	text-align: center;
	line-height: 200px;
}

body>.el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>
