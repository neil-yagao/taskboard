<template>
  <div class="row">
    <div class="col-9">
      <div class="jumbotron">
        <span class="close float-right-top-corner" @click="$router.push('/task/accept-task')">&times</span>
        <h1 class="display-4">{{task.name}}</h1>
        <p class="lead">预计花费：{{task.budget}}</p>
        <hr class="my-4">
        <p>{{task.description}}</p>
        <p class="lead">
          <div class="row">
            <div class="col-9">
              <el-tag v-for="(skill,index) in task.skills" :key="index">{{skill}}</el-tag>
            </div>
            <div class="col">
              <el-button type="success" class="float-right" @click="bidProject" v-if="$store.state.user._id !== task.creator._id">参与竞争</el-button>
            </div>
          </div>
        </p>
      </div>
      <div class="list-group">
        <template v-for="(bid) in task.bidDetails">
          <a class="list-group-item list-group-item-action flex-column align-items-start" :key="bid._id">
            <task-comment :comment="bid" :task="task" />
          </a>
        </template>
      </div>
      <el-button plain class="float-right mt-2" @click.native="$router.push('/task/accept-task')">返回任务列表</el-button>
    </div>
    <div class="col-3">
      <h5>发布任务的大侠</h5>
      <user-panel :user-info="task.creator" />
    </div>
    <bid-modal ref="bidModal" :task="task" @modal-close="fetchTask" />
  </div>
</template>
<script>
import BidModal from "./bid-modal.vue";
import UserPanel from "../../user/self-panel.vue";
import TaskComment from "./task-comment.vue";
export default {
	name: "task-detail",
	data() {
		return {
			task: {}
		};
	},
	created: function() {
		this.fetchTask();
	},
	methods: {
		bidProject() {
			this.$refs["bidModal"].showBid();
		},
		fetchTask() {
			let id = this.$route.params.id;
			this.axios.get("/tasks/" + id).then(res => {
				this.task = res[0];
			});
		}
	},
	components: {
		BidModal,
		UserPanel,
		TaskComment
	}
};
</script>
<style scoped>
.float-right-top-corner {
	margin-top: -3.5rem;
	margin-right: -1rem;
	font-size: 32px;
}
</style>
