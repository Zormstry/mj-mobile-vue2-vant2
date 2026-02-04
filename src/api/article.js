import request from '@/utils/request'

export function getArticleAPI (info) {
  return request({
    method: 'GET',
    url: '/h5/interview/query',
    params: info
  })
}
