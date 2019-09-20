import axios from 'axios'
// console.log(process.env.NODE_ENV)
/* eslint-disable */
const API_ROOT = 'http://blogapi.codebear.cn/index.php' //生产环境接口地址
const API_ROOT_DEV = 'http://blogapi.codebear.cn/index.php' //开发环境接口地址

// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/util/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? API_ROOT : API_ROOT_DEV, // url = base url + request url  process.env.VUE_APP_BASE_API
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})




/* eslint-enable */
// axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? API_ROOT : API_ROOT_DEV)
axios.defaults.headers.Accept = 'application/json'
console.log(axios.defaults)

//接口分类：'a/'后台管理接口  'w/'前台管理接口

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.url.indexOf('a/') === 0) {
      if (getAccessToken()) {
        config.headers['accessToken'] = getAccessToken()
      }
    }
    // do something before request is sent
    // if (getToken()) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   console.log(res)
    //   return res
    // }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
