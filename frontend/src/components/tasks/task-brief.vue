<template>
<div class="jumbotron-item"
     @mouseover="showBtn = true"
     @mouseleave="showBtn=false"
     @click="checkDetail">
	<div class="row">
		<div class="col-9">
			<h4>{{task.name}}</h4>
			<p>{{task.description}}</p>
			<div class="row mt-2">
				<el-button type="text"
				           v-for="(s,index) in task.skills"
				           :key="index">{{s}}</el-button>
			</div>
		</div>
		<div class="col-3">
			<h5>￥{{task.budget}}</h5>
			<span style="margin-top:0.4rem">{{task.bids|| 0}}个候选人</span>
			<p v-show="showBtn"
			   style="margin-top:0.5rem">
				<el-button type="success"
				           size="small"
				           @click="bidProject">参与竞争</el-button>
			</p>
		</div>
	</div>
	<bid-modal ref="bidModal"
	           :task="task"
	           @modal-close="$emit('update-list')" />
</div>
</template>
<script>
import BidModal from './bid-modal.vue'
export default {
	name: 'task-brief',
	data() {
		return {
			showBtn: false
		}
	},
	props: {
		task: {
			type: Object,
			required: true
		}
	},
	methods: {
		bidProject() {
			this.$refs['bidModal'].showBid()
		},
		checkDetail() {
			this.$router.push('/task/task-detail/' + this.task._id)
		}
	},
	components: {
		BidModal
	}

}
</script>
