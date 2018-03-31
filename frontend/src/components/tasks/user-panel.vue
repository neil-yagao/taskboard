<template>
<el-card :body-style="{ padding: '0px' }">
	<img src="/static/logo.png"
	     class="image">
	<div style="padding: 14px;">
		<span>{{createInfo.creator.username}}</span>
		<div class="bottom clearfix">
			<time class="time">{{ createInfo.createDate }}</time>
			<el-button type="text"
			           class="button">更多相关</el-button>

		</div>
	</div>
</el-card>
</template>
<script>
import moment from 'moment'
export default {
	name: 'user-panel',
	data() {
		return {

		}
	},
	props: {
		createInfo: {
			type: Object,
			default () {
				return {
					creator: {
						username: 'neilhu',
						rate: 4
					},
					createDate: moment().format('YYYY-MM-DD')
				}
			}
		}
	}
}
</script>
<style scoped>
.time {
	font-size: 13px;
	color: #999;
	display: inline-block;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;
	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both
}
</style>
