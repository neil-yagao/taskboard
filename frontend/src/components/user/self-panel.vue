<template>
  <el-card :body-style="{ padding: '0px' }">
    <head-pic :user-id="user._id" :head-image="user.profile.headImage" :disabled="!headSwitch"/>
    <div style="padding: 14px">
      <div class="bottom clearfix">
        <span>{{user.username || $store.state.user.username}}</span>
        <el-button type="text" class="button">{{user.profile.level}}</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import swal from 'sweetalert2';
import HeadPic from './head-pic.vue';
export default {
	name: 'self-panel',
	data() {
		return {
			user: this.userInfo,
			file: '',
			header: ''
		};
	},
	props: {
		headSwitch: {
			type: Boolean,
			default: false
		},
		userInfo: {
			type: Object,
			require: false,
			default: function() {
				return {
					profile: {}
				};
			}
		}
	},
	watch: {
		userInfo: {
			handler: function(val) {
				this.user = val;
			},
			deep: true
		}
	},
	methods: {
		switchHead() {
			if (this.headSwitch) {
				this.$refs['hidden-uploader'].click();
			}
		},
		_loadUser() {
			console.log('user', this.$store.state.user);
			this.axios.get('/users/' + this.$store.state.user._id).then(res => {
				this.user = res;
				var url = window.URL || window.webkitURL;
				this.header =
					'data:image/png;base64,' +
					res.profile.headImage.data.join('');
			});
		},
		selectedFile($event) {
			console.log('event', $event);
			if ($event.target.files && $event.target.files.length > 0) {
				this.$messageBox.swalModal({
					titleText: '正在为您上传头像',
					text: '请稍后',
					onOpen: () => {
						swal.showLoading();
					}
				});
				var file = $event.target.files[0];
				var self = this;
				var reader = new FileReader();
				var fileReader = new FileReader();
				fileReader.onload = function(evt) {
					var formData = new FormData();
					formData.append('file', evt.target.result);
					formData.append('name', file.name);
					console.log('evt', evt.target.result);
					self.axios
						.post(
							'/users/' + self.$store.state.user._id + '/head',
							formData
						)
						.then(res => {
							swal.close();
							self.$refs['hidden-uploader'].value = '';
						})
						.catch(res => {
							self.$refs['hidden-uploader'].value = '';
						});
				};

				fileReader.readAsBinaryString(file);
			}
		}
	},
	mounted() {
		if (!this.userInfo._id) {
			this._loadUser();
		}
	},
	components: {
		HeadPic
	}
};
</script>
<style scoped>
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
	content: '';
}

.clearfix:after {
	clear: both;
}
</style>
