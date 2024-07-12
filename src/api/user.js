import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}

export function updatePwd(data) {
  return request({
    url: '/api/user/pwd',
    method: 'post',
    data
  })
}
