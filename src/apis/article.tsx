import type { PageData } from '@/pages/Article'
import { request } from '@/utils'

interface EditArticleData {
  id: string
  title: string
  channel_id: number
  content: string
  cover: {
    type: number
    images: { url: string }[]
  }
}

export const getArticleListAPI = (params: PageData) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

export const delArticleAPI = (id: string) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE',
  })
}

export const getArticleAPI = (articleId: string) => {
  return request({
    url: `/mp/articles/${articleId}`,
    method: 'GET',
  })
}

export const editArticleAPI = (data: EditArticleData) => {
  return request({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}