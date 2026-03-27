import type { LoginFormValues } from '@/store/modules/userStore';
import { request } from '@/utils'

export function loginAPI(loginFrom: LoginFormValues) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: loginFrom
  })
}

export function getUserInfoAPI() {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}