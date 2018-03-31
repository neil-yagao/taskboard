<template>
<a class="list-group-item list-group-item-action flex-column align-items-start">
	<div class="row">
		<div class="col"
		     style="text-align:center">
			<img src="/static/logo.png" />
			<p>{{comment.creator.username || 'neilHu'}}</p>
		</div>
		<div class="col-9">
			<div class="d-flex w-100 justify-content-between">
				<h5 class="mb-1">{{comment.price}}</h5>
				<small>{{comment.createdDate || moment().format('YYYY-MM-DD hh:mm')}}</small>
			</div>
			<p class="mb-1">{{comment.description}}</p>

		</div>
	</div>
</a>
</template>
<script>
import moment from 'moment'
export default {
	name: 'task-comment',
	props: {
		comment: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			moment: moment
		}
	}
}
</script>
