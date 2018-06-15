export default {
	setLoginUser(state, payload) {
		state.hasLogin = true;
		state.user = payload;
		if (window.localStorage) {
			localStorage.setItem('username', payload.username);
			localStorage.setItem('userid', payload._id);
		}
	},
	logoutUser(state) {
		state.user = {};
		state.hasLogin = false;
	}
};
