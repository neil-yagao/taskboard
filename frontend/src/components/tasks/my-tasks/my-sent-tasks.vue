<template>
	<div>
		<el-collapse v-model="active" accordion>
			<el-collapse-item :name="task._id" v-for="task in tasks" :key="task._id">
        		<template slot="title">
					<div class="row">
						<div class="col-4">
							<span class="h2">{{task.name}}</span>
						</div>
						<div class="col-4">
							<span class="lead">创建时间：{{moment(task.createdDate).format('YYYY-MM-DD HH:mm')}}</span>
						</div>
						<div class="col-4">
							<span class="lead">参与人：{{task.bids?task.bids:'未有回应'}}</span>
						</div>
					</div>
				</template>
        <task-brief :task="task" show-biding="false"/>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
import TaskBrief from '../overall/task-brief.vue'
export default {
	name: "my-sent-task",
	data() {
		return {
			tasks: [],
			active: ""
		};
	},
	methods: {
		_queryForTask() {
      this.axios.get('/tasks/user/' + this.$store.state.user._id + '/created-tasks')
      .then(res =>{
        this.tasks = res;
      })
    }
	},
  mounted(){
    this._queryForTask();
  },
  components:{
    TaskBrief
  }
};
</script>

