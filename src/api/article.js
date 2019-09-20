import request from '@/util/request'

export function getLists(params) {
  return request({
    url: 'http://blogapi.codebear.cn/index.php/w/comments/list',
    method: 'get',
    params
  })
}

export function getArticle(params) {
  return request({
    url: 'http://blogapi.codebear.cn/index.php/w/article',
    method: 'get',
    params
  })
}