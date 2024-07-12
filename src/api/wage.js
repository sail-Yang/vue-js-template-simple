import request from '@/utils/request'
export function addWage(data) {
  return request({
    url: '/api/wage/add',
    method: 'post',
    data
  })
}

export function getMoneyByDate(data) {
  return request({
    url: '/api/wage/info',
    method: 'post',
    data
  })
}

export function updateWage(data) {
  return request({
    url: '/api/wage/update',
    method: 'post',
    data
  })
}

export function getAllWageList(data) {
  return request({
    url: '/api/wage/list',
    method: 'get',
    params: data
  })
}

export function getWages(data) {
  return request({
    url: '/api/wage/query',
    method: 'post',
    data
  })
}

export function getWorkerWage(data) {
  return request({
    url: '/api/wage/worker',
    method: 'post',
    data
  })
}