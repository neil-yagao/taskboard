export default {
  setLoginUser(state, payload) {
    state.hasLogin = true;
    state.user = payload.msg;
    if (window.localStorage) {
      localStorage.setItem('username', payload.msg.username);
      localStorage.setItem('userid', payload.msg._id);
    }
  },
  logoutUser(state) {
    state.user = {};
    state.hasLogin = false;
  }
}