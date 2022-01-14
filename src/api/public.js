import request from '@/utils/request'

const apis = {
  Login: '/user/user/login',
  Logout: '/user/user/logout',
  Reset: '/user/user/reset',
  Register: '/user/user/register',
  Retrieve: '/user/user/retrieve'
}

export function login (parameter) {
  return request({
    url: apis.Login,
    method: 'post',
    data: parameter
  })
}

export function logout (parameter) {
  return request({
    url: apis.Logout,
    method: 'post',
    data: parameter
  })
}
