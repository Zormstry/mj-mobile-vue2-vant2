import request from '@/utils/request'

export function registerUserAPI (info) {
  return request({
    method: 'POST',
    url: '/h5/user/register',
    data: info
  })
}

export function loginUserAPI (info) {
  return request({
    method: 'POST',
    url: '/h5/user/login',
    data: info
  })
}
