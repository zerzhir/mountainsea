import { config } from './index'
import router from '../router'
import _find from 'lodash/find'
import message from 'ant-design-vue/es/message'
import store from '../store'
const errorList = [
  {
    code: 1002
  }
]
export default (data, resolve, reject) => {
  console.log(data, config)
  const errCode = parseInt(data[config.code])
  const errItem = _find(errorList, {
    code: errCode
  })
  if (errItem) {
    if (errItem.code === 1002) {
      store.commit('base/UPDATE_OPENLOGIN', true)
      store.commit('base/UPDATE_TOKEN', '')
    }
    message.error(data[config.message], 3, () => {
      errItem.redirect &&
        router.push(errItem.redirect).catch(err => {
          console.log(err)
        })
    })
  } else {
    message.error(data[config.message])
  }
  reject({ ...data, ...errItem })
}
