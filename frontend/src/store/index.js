import Vue from 'vue'
import Vuex from 'vuex'

import state from './global'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  modules:{}
})
