<template>
<div>
	<el-dialog title="我要竞价"
	           :visible.sync="bidShow"
	           :close-on-click-modal="false">
		<el-form :model="bidDetail"
		         :rules="rules"
		         ref="bidDetail">
			<el-form-item label="竞价"
			              prop="price">
				<el-input v-model="bidDetail.price"
				          auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="竞争宣言"
			              prop="description">
				<el-input type="textarea"
				          :rows="4"
				          placeholder="告诉任务发出者，您为什么是合适的人选"
				          v-model="bidDetail.description">
				</el-input>
			</el-form-item>
		</el-form>
		<div slot="footer"
		     class="dialog-footer">
			<el-button @click="bidShow = false">再想想</el-button>
			<el-button type="success"
			           @click="doBid()">开始吧</el-button>
		</div>

	</el-dialog>
	<login-required-modal ref="requireLogin"
	                      title="让我们认识一下接任务的勇士吧!" />
</div>
</template>
<script>
import moment from 'moment';
import LoginRequiredModal from '../../login-required-modal.vue';
export default {
	name: 'bid-modal',
	data() {
		return {
			bidShow: false,
			bidDetail: {
				price: '',
				description: ''
			},
			rules: {
				price: [
					{
						required: true,
						message: '输入你的价格吧！',
						trigger: 'blur'
					}
				],
				description: [
					{
						required: true,
						min: 100,
						message: '输入你的百字竞价宣言吧！',
						trigger: 'blur'
					}
				]
			}
		};
	},
	props: {
		task: {
			type: Object,
			required: true
		}
	},
	methods: {
		showBid() {
			this.bidShow = true;
		},
		doBid() {
			this.$refs['bidDetail'].validate(valid => {
				if (valid) {
					if (!this.$store.state.hasLogin) {
						this.bidShow = false;
						this.$refs['requireLogin'].doShow().then(() => {
							this.doPushBidDetail();
						});
					} else {
						this.doPushBidDetail();
					}
				} else {
					return false;
				}
			});
		},
		doPushBidDetail() {
			this.bidDetail.creator = this.$store.state.user;
			this.bidDetail.createdDate = moment().format('YYYY-MM-DD HH:mm');
			this.bidDetail.timestamp = moment().format('x');
			this.axios
				.put('/tasks/' + this.task._id + '/bids', this.bidDetail)
				.then(res => {
					this.bidShow = false;
					this.$emit('modal-close');
					this.$messageBox.success('竞价成功');
				});
		}
	},
	components: {
		LoginRequiredModal
	}
};
</script>
