<template>
  <div id="article" v-loading="loading">
    <div class="article-warp" v-if="article.id">
      <div class="article-message">
        <p class="article-title">
          {{ article.title }}
        </p>
        <div class="article-info">
          <i class="iconfont icon-calendar"></i>
          发表于 {{ article.publishTime | time('YYYY年MM月DD日') }} •
          <i class="iconfont icon-folder"></i>
          <span class="classify" @click="toList('category', category.id)">{{ category.name }}</span> •
          <i class="iconfont icon-eye"></i>
          {{ article.pageview }}次围观
        </div>
        <div class="article-sub-message">{{ article.subMessage }}</div>
      </div>
      <md-preview :contents="article.htmlContent" />
      
      <div class="tags">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="tag"
          @click="$router.push({name: 'articleList', query:{type: 'tag', id: tag.id}})">
          <i class="iconfont icon-tag"></i>
          {{ tag.name }}
        </div>
      </div>
      <div class="pre-next-wrap">
        <span class="pre-wrap" v-if="pn.pre" @click="$router.push({name: 'article', query:{id: pn.pre.id}})">
          <i class="el-icon-arrow-left"></i>
          {{ pn.pre.title }}
        </span>
        <span class="next-wrap" v-if="pn.next" @click="$router.push({name: 'article', query:{id: pn.next.id}})">
          {{ pn.next.title }}
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
    </div>
    <no-data
      v-if="!article.id"
      text="没有找到该文章~"/>

      <!-- 移动端显示弹出右边目录按钮 -->
    <div class="left_nav_btn" @click="drawer = true">目录</div>

    <!-- 右边目录弹框 -->
    <el-drawer
      title=""
      :visible.sync="drawer"
      :direction="direction"
      :size = "isMobile?'50%':'30%'"
      :modal = 'isMobile?true:false'
      >
      <div style="height:100%;overflow:auto;background-color: #262a30;">
        <article-menu :menu="articleMenu" :start="0"/>
      </div>
      
    </el-drawer> 
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
import mdPreview from '@/components/mdPreview/mdPreview'
import articleMenu from '@/components/articleMenu/articleMenu'
import noData from '@/components/noData/noData'
import { getArticle } from '@/api/article.js'

export default {
  name: 'articles',
  components: {
    mdPreview,
    articleMenu,
    noData,
    // comments
  },
  data () {
    return {
      showQrcode: false,
      article: {},
      category: {},
      tags: [],
      qrcode: {},
      pn: {},
      loading: false,
      drawer: false,
      direction: 'rtl',
    }
  },
  computed: {
    ...mapGetters([
      'articleMenu',
      'articleMenuSource',
      'isMobile'
    ])
  },
  created() {
    this.initData()
  },
  watch: {
    $route(route) {
      this.initData()
    }
  },
  mounted:function(){
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollListener, false)
  },
  methods: {
    ...mapActions([
      'setArticleMenuTag'
    ]),
    scrollListener(){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (this.articleMenu) {
        for (let i = 0, len = this.articleMenuSource.length; i < len; ++i) {
          let item = this.articleMenuSource[i]
          let top = document.getElementById(item.id).getBoundingClientRect().top
          top += document.body.scrollTop || document.documentElement.scrollTop
          if (scrollTop <= top + 20) {
            this.setArticleMenuTag(item.tag)
            break
          }
        }
      }
    },
    // scrollToTarget (target, animation = true) {
    //     var timer = null
    //   if (!animation) {
    //     document.body.scrollTop = document.documentElement.scrollTop = 0
    //     return
    //   }
    //   let currentNum = document.body.scrollTop || document.documentElement.scrollTop
    //   let t = 0
    //   clearInterval(timer)
    //   let dir = 1
    //   if (target > currentNum) {
    //     dir = -1
    //   }
    //   timer = setInterval(() => {
    //     // 匀加速运动
    //     t++
    //     currentNum -= (2 * t * dir)
    //     document.body.scrollTop = document.documentElement.scrollTop = currentNum
    //     if ((dir === 1 && currentNum <= target) || (dir === -1 && currentNum >= target)) {
    //       document.body.scrollTop = document.documentElement.scrollTop = target
    //       clearInterval(timer)
    //     }
    //   }, 16.7)
    // },
    initData() {
      this.article = {}
      this.category = {}
      this.tags = []
      this.qrcode = {}
      this.pn = {}
      let id = this.$route.query.id;
      if (id) {
        this.loading = false
         getArticle({
           id:id
         })
          .then((data) => {
            console.log(data)
            this.article = data.data.article
            this.category = data.data.category
            this.tags = data.data.tags
            this.qrcode = data.data.qrcode
            this.pn = data.data.pn
            this.loading = false
          })
          .catch(()=> {
            this.loading = false
          })
      }
    },
    toList (type, id) {
      this.$router.push({
        name: 'articleList',
        params: {
          type: type,
          id: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.left_nav_btn
  position: fixed
  width: 40px
  height: 40px
  background-color: #262a30
  right: 40px
  bottom: 90px
  padding: 5px
  z-index: 1050
  cursor: pointer
  color: #fff
  line-height: 30px
  font-size: 10px
  border-radius: 50%
  cursor: pointer
#article
  position: relative
  padding: 30px 10px
  width: 100%
  .article-warp
    position: relative
    animation: show .8s
    padding: 30px
    width: 100%
    @media (max-width: 768px)
      padding: 30px 15px
    background-color: $color-white
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
    .article-message
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .article-title
        font-size: 26px
        @media (max-width: 768px)
          font-size: 22px
        font-weight: bold
      .article-info
        font-size: 14px
        @media (max-width: 768px)
          font-size: 12px
        margin: 20px 0px
        color: #666666
        display: flex
        flex-direction: row
        justify-content: center
        flex-wrap: wrap
        .classify
          color: #444444
          border-bottom: 1px solid $color-main
          cursor: pointer
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
          margin-right: 5px
          &:hover
            color: $color-main
        .iconfont
          font-size: 14px
          @media (max-width: 768px)
            font-size: 12px
          margin: 0 5px
          &:first-child
            margin-left: 0
      .article-sub-message
        font-size: 14px
        color: #999999
        margin-bottom: 20px
    .money-wrap
      width: 100%
      padding: 20px 30px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      > p
        line-height: 2
        color: #555555
        font-size: 14px
        margin-top: 20px
        text-align: center
      .money-btn
        margin-top: 10px
        padding: 10px 24px
        background-color: #f44336
        border-radius: 5px
        color: $color-white
        font-size: 16px
        font-weight: bold
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        transition: background-color .3s
        &:hover
          background-color: #f44336
      .qrcode-wrap
        margin-top: 10px
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        flex-wrap: wrap
        .qrcode
          width: 200px
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          margin-bottom: 10px
          padding: 10px
          > img
            width: 180px
            height: 180px
          > p
            text-align: center
            line-height: 1.5
            color: #555555
            font-size: 14px
    .tags
      width: 100%
      padding: 10px 0px
      display: flex
      flex-direction: row
      align-items: center
      flex-wrap: wrap
      border-bottom: 1px solid #eeeeee
      .tag
        color: $color-white
        padding: 5px
        background-color: $color-main
        font-size: 12px
        margin-right: 5px
        border-radius: 5px
        position: relative
        margin-left: 10px
        margin-top: 10px
        line-height: 1
        transition: all .3s
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        &:hover
          &:before
            border-right: 12px solid $color-main
          background-color: $color-main
        &:before
          position: absolute
          left: -9px
          top: 0
          width: 0
          height: 0
          content: ""
          border-top: 11px solid transparent
          border-bottom: 11px solid transparent
          border-right: 12px solid $color-main
          transition: all .3s
        .iconfont
          font-size: 12px
    .pre-next-wrap
      width: 100%
      padding-top: 25px
      display: flex
      flex-direction: row
      font-size: 14px
      color: #555555
      font-weight: bold
      .pre-wrap
        padding-right: 10px
        text-align: left
      .next-wrap
        padding-left: 10px
        text-align: right
      .pre-wrap,
      .next-wrap
        flex: 1
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        &:hover
          color: #555555
.slide-fade-enter-active
  transition: all .3s ease
.slide-fade-leave-active
  transition: all .3s ease
.slide-fade-enter
.slide-fade-leave-to
  transform: translateY(20px)
  opacity: 0
@keyframes show {
  from {
    margin-top: -10px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
</style>