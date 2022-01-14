import axios from 'axios'
import path from 'path'
import api from './api'
// import sign from './sign'
import error from './error'
import store from '../store'
// import storage from 'store'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
export const config = {
  data: 'data',
  code: 'code',
  message: 'msg',
  codeSuccess: '0000',
  codeTokenInvalid: '1002',
  timeout: 30000
}
const fetch = (apiName, data = {}, fetchConfig) => {
  fetchConfig = _merge(
    {
      method: 'post',
      responseType: 'json'
    },
    fetchConfig
  )
  const token = store.state.base.token // storage.get(ACCESS_TOKEN)
  const headers = _merge(
    {
      'Content-Type': 'application/json',
      Authorization: token || 'xxxx'
    },
    fetchConfig.headers
  )
  const url = _get(api, apiName)
  const base = _get(api, `${apiName.split('.')[0]}.base`)
  return new Promise((resolve, reject) => {
    if (!apiName || !url) {
      reject(new Error('请求地址无效'))
      return
    }
    axios({
      baseURL: process.env.VUE_APP_API_BASE_URL,
      timeout: config.timeout,
      url: path.join(base, url),
      method: fetchConfig.method,
      headers,
      responseType: fetchConfig.responseType,
      data: data
      // {
      // 	...data,
      // 	signature: sign(data)
      // }
    })
      .then(res => {
        console.log(res)
        if (res.headers.authorization && res.headers.authorization !== token) {
          // storage.set(ACCESS_TOKEN, res.headers.authorization, 7 * 24 * 60 * 60 * 1000)
          store.commit('base/UPDATE_TOKEN', res.headers.authorization)
        }
        const data = res.data || {}
        if (res.status === 200) {
          try {
            if (data[config.code] === config.codeSuccess) {
              resolve(data[config.data])
            } else {
              error(data, resolve, reject)
            }
          } catch (err) {
            reject(err)
          }
        } else {
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  fetch
}
