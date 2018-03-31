// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import "../static/base-style.css"
import axios from './components/general/axios-plugin'
import general from './components/general/general-function'
import msgBoxWrap from './components/general/message-box-wrap'

Vue.use(ElementUI) //could be further reduce range by use individually
Vue.use(general, {})
Vue.use(msgBoxWrap)

let instance = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use(axios, {
  instance
})