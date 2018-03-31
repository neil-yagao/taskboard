import axios from 'axios'

function setUpAxios(Vue, config) {
  let instance = config.instance;
  Vue.prototype.axios = (function () {
    let instance = axios.create({
      baseURL: '/dev',
      headers: {
        'content-type': 'application/json',
        'user': 'neil.hu'
      }
    })
    instance.defaults.timeout = 2500;
    //general monitor for requesting
    instance.interceptors.request.use(function (config) {
      console.log('sending request:', config)
      return config;
    }, function (error) {
      console.error('request error', error)
      return Promise.reject(error);
    });


    instance.interceptors.response.use(function (response) {
      console.log('receive response', response)

      let data = response.data;
      return data;
    }, function (error) {
      return Promise.reject(error);
    });
    return instance;
  }())
}

export default {
  install: setUpAxios
}