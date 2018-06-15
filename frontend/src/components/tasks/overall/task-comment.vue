<template>
  <div class="row" :class="task.acceptedBid == comment._id ?'chosen-comment':''">
    <div class="col" style="text-align:center" v-if="!hideHead">
      <img :src="comment.creator.headImage" />
      <p>{{comment.creator.username}}</p>
    </div>
    <div class="col-9" @mouseover="showBtn = true" @mouseleave="showBtn=false">
      <div class="d-flex w-100 justify-content-between" >
        <h5 class="mb-1">{{comment.price}}</h5>
        <small>{{moment(comment.createdDate).format('YYYY-MM-DD hh:mm') || moment().format('YYYY-MM-DD hh:mm')}}</small>
      </div>
      <p class="mb-1">{{comment.description}}</p>
      <el-button type="success" class="float-right"
       v-show="showBtn" @click="acceptBids()"
        v-if="$store.state.user._id === task.creator._id && task.status !=='ACCEPTED'">就决定是你了！</el-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
	name: 'task-comment',
	props: {
		comment: {
			type: Object,
			required: true
		},
		task: {
			type: Object,
			required: true
		},
		hideHead: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			showBtn: false
		};
	},
	methods: {
		acceptBids() {
			this.axios
				.post('/tasks/' + this.task._id + '/bids', this.comment)
				.then(res => {
					this.$message.success('接受该申请！');
				});
		}
	}
};
</script>
<style>
.chosen-comment {
  background-color: lightblue
}
</style>
