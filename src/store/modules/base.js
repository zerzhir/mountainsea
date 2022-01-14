import server from '@/server'
import { transTree } from '@/utils/filters'
import lodash from 'lodash'
export default {
  namespaced: true,
  state: {
    token: '',
    configs: {},
    formItems: {},
    user: {},
    permissions: [],
    menus: [],
    originMenus: [],
    enums: {},
    openLogin: false
  },
  getters: {
    configs: state => state.configs,
    formItems: state => state.formItems,
    token: state => state.token
  },
  mutations: {
    UPDATE_OPENLOGIN: (state, val) => {
      state.openLogin = val
    },
    UPDATE_TOKEN: (state, token) => {
      state.token = token
    },
    UPDATE_USER: (state, user) => {
      state.user = user
    },
    UPDATE_CONFIGS: (state, configs) => {
      state.configs = configs
    },
    UPDATE_FORMITEMS: (state, item) => {
      state.formItems = Object.assign(state.formItems, item)
    },
    UPDATE_MENUS: (state, menus) => {
      state.menus = menus
    },
    UPDATE_ORIGINMENUS: (state, menus) => {
      state.originMenus = menus
    },
    UPDATE_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    UPDATE_ENUMS: (state, enums) => {
      state.enums = enums
    }
  },
  actions: {
    fetchMenus ({ commit, state }) {
      return new Promise((resolve, reject) => {
        server
          .fetch('user.userMenu', {})
          .then(res => {
            const adminMenus = [
              {
                id: 39,
                title: '用户管理',
                code: 'user',
                url: null,
                path: '/user',
                pid: 0,
                has_children: 0,
                status: 1,
                icon: 'user',
                type: 1,
                auth: 1,
                sort: 0,
                create_time: null,
                create_by: null,
                role_id: 1
              }
            ]
            let menus = []
            let permissions = []
            if (state.user.authority.indexOf('admin') > -1) {
              res.menus = adminMenus.concat(res.menus)
            }
            menus = transTree(res.menus, 'id', 'pid', 0)
            permissions = lodash.map(res.permissions, 'code')
            commit('UPDATE_MENUS', menus)
            commit('UPDATE_ORIGINMENUS', res.rules)
            commit('UPDATE_PERMISSIONS', permissions)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchEnums ({ commit, state }) {
      return new Promise((resolve, reject) => {
        server
          .fetch('base.enumFormat', {})
          .then(res => {
            commit('UPDATE_ENUMS', res)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchConfigs ({ commit, state }) {
      return new Promise((resolve, reject) => {
        server
          .fetch('base.setupAll', {})
          .then(res => {
            const configs = {}
            res.forEach(item => {
              configs[item.code] = item.value
            })
            commit('UPDATE_CONFIGS', configs)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    saveErrorLogs ({ commit, state }, data) {}
  }
}
