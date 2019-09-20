import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',//首页
      name: 'Home',
      component: Home
    },
    {
      path: '/categories',//分类标签
      name: 'Categories',
      component: () => import(/* webpackChunkName: "about" */ './views/Categories.vue')
    },
    {
      path: '/archives',//归档
      name: 'Archives',
      component: () => import(/* webpackChunkName: "about" */ './views/Archives.vue')
    },
    
    {
      path: '/article',//文章
      name: 'Article',
      component: () => import(/* webpackChunkName: "about" */ './views/Article.vue')
    },
    {
      path: '/articleList',//文章列表
      name: 'ArticleList',
      component: () => import(/* webpackChunkName: "about" */ './views/ArticleList.vue')
    },
    {
      path: '/search',//搜索
      name: 'Search',
      component: () => import(/* webpackChunkName: "about" */ './views/Search.vue')
    },
    // {
    //   path: '/mheader',//搜索
    //   name: 'mHeader',
    //   component: () => import(/* webpackChunkName: "about" */ './components/mHeader/mHeader.vue')
    // }
  ]
})
