<template>
<div class="row">
  <div class="col-3">
    <self-panel :user-info="user" :head-switch="true" v-if="user._id"/>
  </div>
  <div class="col">
	  <user-profile :user-profile="user"/>
	</div>
</div>
</template>
<script>
import moment from 'moment';
import SelfPanel from './self-panel.vue';
import UserProfile from './user-profile.vue';
export default {
	name: 'user-panel',
	data() {
		return {
      user:{}
    };
	},
	props: {
		createInfo: {
			type: Object,
			require: true
		}
  },
  methods:{
    _loadUser(){
      this.axios.get('/users/' + this.$store.state.user._id).then(user =>{
        console.log('user', user);
        this.user = user;
      })
    }
  },
	components: {
		SelfPanel,
		UserProfile
  },
  created(){
    this._loadUser();
  }
};
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
	content: '';
}

.clearfix:after {
	clear: both;
}
</style>
