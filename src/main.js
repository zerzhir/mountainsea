// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import server from './server'
import i18n from './locales'
import { Icon } from 'ant-design-vue'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import {
  upperFirst,
  isPlainObject,
  isArray,
  cloneDeep,
  pick,
  has,
  map,
  isString,
  merge,
  remove,
  findIndex,
  forIn,
  isNumber,
  find,
  get
} from 'lodash'
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
// import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
import uploader from 'vue-simple-uploader'

Vue.config.productionTip = false
Vue.prototype.$server = server
Vue.prototype.$lodash = {
  upperFirst,
  isPlainObject,
  isArray,
  cloneDeep,
  pick,
  has,
  map,
  isString,
  merge,
  remove,
  findIndex,
  forIn,
  isNumber,
  find,
  get
}
const ZIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3130981_5023w8jxenq.js'
})
// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.use(uploader)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('z-icon', ZIcon)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex, Logo message
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
