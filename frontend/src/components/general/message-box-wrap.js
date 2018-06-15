import swal from 'sweetalert2';

export default {
	install(Vue) {
		Vue.prototype.$messageBox = {
			alert(msg, title = '似乎有些问题？', cancel = '', confirm = '确定') {
				return swal({
					titleText: title,
					text: msg,
					type: 'warning',
					showCancelButton: cancel ? true : false,
					cancelButtonText: cancel,
					confirmButtonText: confirm,
					timer: confirm === '确定' ? 2000 : null
				});
			},
			error(msg, title = '错误', cancel = '', confirm = '确定') {
				return swal({
					titleText: title,
					text: msg,
					type: 'error',
					showCancelButton: cancel ? true : false,
					cancelButtonText: cancel,
					confirmButtonText: confirm
				});
			},
			success(msg, title = '成功', cancel = '', confirm = '确定') {
				return swal({
					titleText: title,
					text: msg,
					type: 'success',
					showCancelButton: cancel ? true : false,
					cancelButtonText: cancel,
					confirmButtonText: confirm,
					timer: confirm === '确定' ? 2000 : null
				});
			},
			swalModal(params) {
				return swal(params);
			}
		};
	}
};
