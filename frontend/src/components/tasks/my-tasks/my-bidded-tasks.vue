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
							<span class="lead">{{task.budget}}</span>
						</div>
						<div class="col-4">
							<span class="lead">{{task.bids}}</span>
						</div>
					</div>
				</template>
				<div>
          <task-comment :comment="task.mybid" :task="task" :hide-head="true"/>
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
import TaskComment from '../overall/task-comment.vue'
export default {
	name: "my-bided-task",
	data() {
		return {
			tasks: [],
			active: ""
		};
	},
	methods: {
		_queryForTask() {
      this.axios.get('/tasks/user/' + this.$store.state.user._id + '/bided-tasks')
      .then(res =>{
         res.forEach( bid =>{
           var t = bid.task;
           t.mybid = bid;
           this.tasks.push(t);
         });
      })
    }
	},
  components:{
    TaskComment
  },
  mounted(){
    this._queryForTask();
  }
};
</script>

