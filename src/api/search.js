import request from '@/util/request'

export function searchArticle(params) {
  return request({
    url: 'http://blogapi.codebear.cn/index.php/w/article/search',
    method: 'get',
    params
  })
}