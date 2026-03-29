import { request } from '@/utils'
import { type FormValue } from '@/pages/Publish'

export const getChannelAPI = () => {
  return request({
    url: '/channels',
    method: 'GET'
  })
}

export const publishAPI = (params: FormValue) => {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data: params
  })
}
