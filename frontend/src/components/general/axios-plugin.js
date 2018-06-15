import axios from 'axios';
import swal from 'sweetalert2';

function setUpAxios(Vue, config) {
	Vue.prototype.axios = (function() {
		let instance = axios.create({
			baseURL: '/dev',
			headers: {
				'content-type': 'application/json',
				user: 'neil.hu'
			}
		});
		if (config && config.env === 'PROD') {
			instance.defaults.timeout = 2500;
		}
		//general monitor for requesting
		if (swal.isVisible()) {
			swal.close();
		}
		instance.interceptors.request.use(
			function(config) {
				console.log('sending request:', config);
				swal({
					title: '请稍后',
					timer: 5000,
					onOpen: () => {
						swal.showLoading();
					}
				});
				return config;
			},
			function(error) {
				console.error('request error', error);
				return Promise.reject(error);
			}
		);

		instance.interceptors.response.use(
			function(response) {
				console.log('receive response', response);
				let data = response.data;
				swal.close();
				if (!data.success) {
					swal({
						titleText: '尴尬',
						text: data.msg,
						type: 'warning',
						showCancelButton: false,
						confirmButtonText: '再试一次',
						timer: 5000
					});
          return Promise.reject(data.msg);
				}
				return data.msg;
			},
			function(error) {
				return Promise.reject(error);
			}
		);
		return instance;
	})();
}

export default {
	install: setUpAxios
};
