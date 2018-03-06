<template>
<div class="jumbotron-item" @mouseover="showBtn = true" @mouseleave="showBtn=false">
	<div class="row">
		<div class="col-9">
			<h4>{{task.name}}</h4>
			<p>{{task.description}}</p>
			<div class="row mt-2">
				<a class="skill" v-for="s in task.skills">{{s}}</a>
			</div>
		</div>
		<div class="col-3">
			<h5>￥{{task.budget}}</h5>
			<span style="margin-top:0.4rem">{{task.bids|| 0}}个候选人</span>
			<p v-show="showBtn" style="margin-top:0.5rem">
				<el-button type="success" size="small" @click="bidProject">参与竞争</el-button>
			</p>
		</div>
	</div>
</div>
</template>
<script>
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

		}
	}

}
</script>
