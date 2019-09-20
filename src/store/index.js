import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile:false,
    screenWidth: 0,
    articleMenu: false,
    articleMenuSource: [],
    articleMenuTag: '1.'
  },
  getters:{
    isMobile(state){
        return state.isMobile
    },
    screenWidth(state){
        return state.screenWidth
    },
    articleMenu (state) {
      return state.articleMenu
    },
    articleMenuSource (state) {
      return state.articleMenuSource
    },
    articleMenuTag (state) {
      return state.articleMenuTag
    }
  },
  mutations: {
    SCREEN_CHANGE:function(state, data) {      
        state.isMobile = data
    },
    SET_SCREENWIDTH:function(state, data){
        state.screenWidth = data
    },
    SET_ARTICLE_MENU:function (state, data) {
      state.articleMenu = data
    },
    SET_ARTICLE_MENU_SOURCE:function (state, data) {
      state.articleMenuSource = data
    },
    SET_ARTICLE_MENU_TAG:function (state, data) {
      state.articleMenuTag = data
    },
  },
  actions: {
    toggleScreen({ commit }, isMobile) {
        commit('SCREEN_CHANGE', isMobile)
    },
    changeScreen({ commit }, screenWidth) {
      commit('SET_SCREENWIDTH', screenWidth)
    },
    setArticleMenu (store, articleMenu) {
      store.state.articleMenu = articleMenu
    },
    setArticleMenuSource (store, articleMenuSource) {
      store.state.articleMenuSource = articleMenuSource
    },
    setArticleMenuTag (store, articleMenuTag) {
      store.state.articleMenuTag = articleMenuTag
    }
  }
})
