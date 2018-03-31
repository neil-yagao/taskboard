export default {
  name: 'set-user-login',
  data() {
    return {
      user: {
        username: '',
      }
    }
  },
  props: {
    redirect: {
      type: String,
      default: '1'
    }
  },
  methods: {
    successAndRedirect(res, msg) {
      return new Promise((resolve, reject) => {
        try {
          this.createCookie('USER_ID', res._id);
          this.createCookie('USERNAME', res.username);
          this.$store.commit('setLoginUser', res)
          if (this.redirect === '1') {
            this.$messageBox.success(msg).then(() => {
              this.$router.replace('/task/accept-task');
              resolve()
            })
          }
        } catch (e) {
          console.log('error', e)
          reject(e);
        }
      });
    },
    failureWarning(msg) {
      return this.$messageBox.alert(msg)
    }
  }
}