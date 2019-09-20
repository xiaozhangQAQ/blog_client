import request from '@/util/request'

export function getBlogArticleList(params) {
  return request({
    url: 'http://blogapi.codebear.cn/index.php/w/article/list',
    method: 'get',
    params
  })
}