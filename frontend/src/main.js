// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import "../static/base-style.css"
import axios from './components/general/axios-plugin'
Vue.use( ElementUI )
Vue.use( axios )
new Vue( {
	el: '#app',
	router,
	store,
	render: h => h( App )
} )