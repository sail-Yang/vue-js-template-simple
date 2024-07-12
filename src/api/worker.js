import request from '@/utils/request'
// 获取员工列表
export function getWorkerPageList(data) {
  return request({
    url: '/api/worker/list',
    method: 'get',
    params: data
  })
}

export function getWorkerList() {
  return request({
    url: '/api/worker/info',
    method: 'get',
  })
}

export function addWorker(data) {
  return request({
    url: '/api/worker/add',
    method: 'post',
    data
  })
}

export function delWorker(id) {
  return request({
    url: '/api/worker/delete',
    method: 'get',
    params: id
  })
}

export function updateWorker(data) {
  return request({
    url: '/api/worker/update',
    method: 'post',
    data
  })
}