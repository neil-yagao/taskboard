<template>
  		<el-form :model="profile"
		         :rules="rules"
		         label-position="top"
		         name="new-task"
		         ref="new-task">
			<el-form-item prop="nickName" label="大侠的名号">
				<el-input placeholder="江湖上流传的名号"
				          v-model="profile.nickName"
				          clearable></el-input>
			</el-form-item>
      <el-form-item prop="realName" label="大侠的真名">
				<el-input placeholder="大侠尊姓大名"
				          v-model="profile.realName"
				          clearable></el-input>
			</el-form-item>
			<el-form-item prop="preference" label="大侠有何喜好？">
					<tag-input placeholder="+喜好"
				           v-model="profile.preference" />
			</el-form-item>
			<el-form-item label="大侠身负何武义？">
				<tag-input placeholder="+技能"
				           v-model="profile.skills" />
			</el-form-item>
			<el-form-item label="大侠的扬名战绩是啥？">
				<tag-input placeholder="+认证"
				           v-model="profile.certificate" />
			</el-form-item>
			<el-form-item>
				<el-button type="warning"
				           @click="onSubmit"
				           plain>正是在下</el-button>
			</el-form-item>
		</el-form>
</template>
<script>
import TagInput from '../general/tag-input.vue'
export default {
	name: 'user-profile',
	data() {
		return {
			profile: this.userProfile.profile || {},
			rules: {}
		};
	},
	props: {
		userProfile: {
			type: Object,
			require: true
		}
	},
	watch: {
		userProfile: {
			handler: function(val) {
				this.profile = val.profile;
			},
			deep: true
		}
  },
  methods:{
    onSubmit(){
      this.axios.post('/users/' + this.$store.state.user._id + '/profile',this.profile).then(res=>{
        this.profile = res.profile;
      })
    }
  },
  components:{
    TagInput
  }
};
</script>
