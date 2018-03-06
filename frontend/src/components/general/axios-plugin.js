import axios from 'axios'

function setUpAxios( Vue ) {
	Vue.prototype.axios = ( function () {
		let instance = axios.create( {
			baseURL: '/dev',
			headers: {
				'content-type': 'application/json',
				'user': 'neil.hu'
			}
		} )
		instance.defaults.timeout = 2500;
		instance.interceptors.request.use( function ( config ) {
			console.log( 'sending request:', config )
			return config;
		}, function ( error ) {
			console.error( 'request error', error )
			return Promise.reject( error );
		} );
		instance.interceptors.response.use( function ( response ) {
			console.log( 'receive response', response )
			return response.data;
		}, function ( error ) {
			return Promise.reject( error );
		} );
		return instance;
	}() )
}

export default {
	install: setUpAxios
}