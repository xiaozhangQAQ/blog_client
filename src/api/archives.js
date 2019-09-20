import request from '@/util/request'

export function getBlogArticleArchives(params) {
  return request({
    url: 'http://blogapi.codebear.cn/index.php/w/article/archives',
    method: 'get',
    params
  })
}