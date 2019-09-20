import request from '@/util/request'

export function getBlogCategoryList(params) {
  return request({
    url: 'w/category/list',
    method: 'get',
    params
  })
}

export function getBlogTagList(params) {
  return request({
    url: 'w/tag/list',
    method: 'get',
    params
  })
}
getLists
export function getLists(params) {
    return request({
      url: 'w/article/list',
      method: 'get',
      params
    })
  }