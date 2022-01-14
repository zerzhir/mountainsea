import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import base from './modules/base'
import near from './modules/near'
// default router permission control
// import permission from './modules/permission'

// dynamic router permission control (Experimental)
import permission from './modules/async-router'
import getters from './getters'
// import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [persistedState({ storage: window.sessionStorage })],
  strict: true,
  modules: {
    app,
    user,
    base,
    near,
    permission
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
