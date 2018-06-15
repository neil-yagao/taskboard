<template>
	<div class='row'>
		<div class='col-3'>
			<self-panel/>
		</div>
		<div class="col-9">
			<el-tabs type="border-card">
				<el-tab-pane label="我的任务">
					<bided-tasks/>
				</el-tab-pane>
				<el-tab-pane label="我的发布">
					<sent-tasks/>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
import SelfPanel from '../../user/self-panel.vue';
import BidedTasks from './my-bidded-tasks.vue';
import SentTasks from './my-sent-tasks.vue';
export default {
	name: 'my-task-main',
	data() {
		return {
			user: {}
		};
	},
	components: {
		SelfPanel,
		SentTasks,
		BidedTasks
	}
};
</script>
