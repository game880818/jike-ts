import type { PageData } from '@/pages/Article'
import { request } from '@/utils'



export const getArticleListAPI = (params: PageData) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}