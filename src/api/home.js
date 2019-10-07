import request from '@/util/request'

export function getBlogCategoryList(params) {
  return request({
    url: 'http://blogapi.codebear.cn/index.php/w/category/list',
    method: 'get',
    params
  })
}

export function getBlogTagList(params) {
  return request({
    url: 'http://blogapi.codebear.cn/index.php/w/tag/list',
    method: 'get',
    params
  })
}

export function getLists(params) {
    return request({
      url: 'http://blogapi.codebear.cn/index.php/w/article/list',
      method: 'get',
      params
    })
  }

  //测试
  export function login(data) {
    return request({
      url: 'w/user/login',
      method: 'post',
      data
    })
  }  