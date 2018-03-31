import Vue from 'vue'
import Vuex from 'vuex'

import state from './global'
import mutations from './mutations'
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  modules:{},
  mutations
})
