<template>
  <div id="m-header">
    <div class="header-wrap" :style="{height: !isMobile ? '90px' : '60px'}">
      <div class="header-logo" @click="toHomeFromLogo" 
        :style="{
        'justify-content': !isMobile ? 'space-between' : 'center',
        'padding': !isMobile ? '25px' : '0px'
        }">        
        <p class="blog-name">{{ '小张的个人博客' }}</p>
      </div>
      <header-tab-view v-if="!isMobile" :tabs="tabs" @tab-click="selectTab" />
      <div class="toggle" v-if="isMobile" @click="toggle">
        <span
          class="toggle-line"
          v-for="(line, index) in toggleLineData"
          :key="index"
          :style="{
            width: line.width,
            top: line.top,
            transform: line.transform,
            opacity: line.opacity,
            transition: 'all .3s'
          }">
        </span>
      </div>
    </div>
    <el-collapse-transition>
      <div class="mobile-tab-wrap" v-show="isMobile&&showMobileTabs">
        <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)">
          <i class="iconfont" :class="tab.icon"></i>
          <span>{{ tab.name }}</span>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
import ResizeMixin from '@/mixins/ResizeHandler.js'

import headerTabView from './headerTabView'


export default {
  name: 'm-header',
  components: {
    headerTabView
  },
  mixins: [ResizeMixin],
  data () {
    return {
      tabs: [
        {
          name: '首页',
          icon: 'icon-home',
          to: 'Home'
        },
        // {
        //   name: '分类/标签',
        //   icon: 'icon-tag',
        //   to: 'categories'
        // },
        {
          name: '归档',
          icon: 'icon-archives',
          to: 'Archives'
        },
        // {
        //   name: '关于',
        //   icon: 'icon-about',
        //   to: 'about'
        // },
        // {
        //   name: '友链',
        //   icon: 'icon-friends-link',
        //   to: 'friends'
        // },
        // {
        //   name: '更多',
        //   icon: 'icon-more',
        //   to: 'morefunc'
        // },
        {
          name: '搜索',
          icon: 'icon-search',
          to: 'Search'
        }
      ],
      lineStyle: {
        normalLineData: [
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          }
        ],
        closeLineData: [
          {
            width: '100%',
            top: '6px',
            transform: 'rotateZ(-45deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '0'
          },
          {
            width: '100%',
            top: '-6px',
            transform: 'rotateZ(45deg)',
            opacity: '1'
          }
        ]
      },
      toggleLineData: [],
      showMobileTabs: false
    }
  },
  watch: {
    // screen (value) {
    //   this.isPc = true
    //   if (value.width <= 768) {
    //     this.isPc = false
    //   }
    // }
  },
  created() {
    this.toggleLineData = this.lineStyle.normalLineData
  },
  mounted () {
  },
  computed:{
    ...mapState([
      'isMobile'
    ])
  },
  methods: {
    
    toHomeFromLogo () {
      window.location.href = `${window.location.origin}`
    },
    toggle () {
      this.showMobileTabs = !this.showMobileTabs
      this.toggleLineData = this.showMobileTabs ? this.lineStyle.closeLineData : this.lineStyle.normalLineData
    },
    selectTab (tab) {
      this.toggle()
      // console.log(this.$route)
      if(tab.to == this.$route.name){
          return;
      }else{
          this.$router.push({name: tab.to})
      }
      
    }
  }
}
</script>

<style lang="styl" scoped>
*
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
#m-header
  position: relative
  width: 100%
  background-color: #f9f9f9
  .header-wrap
    position: relative
    max-width: 1000px
    padding: 0 10px
    margin: 0 auto
    height: 90px
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    transition: height .3s
    .header-logo
      // height: 100%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: space-between
      color: #262a30
      font-size: 20px
      font-weight: bold
      padding: 25px 0
      &:hover
        cursor: pointer
        .line
          width: 0px
      .line
        width: 70px
        height: 2px
        background-color: #262a30
        animation: logo-line .5s
        transition: width .3s
      .blog-name
        animation: logo-name .5s
    .toggle
      width: 24px
      height: 24px
      background-color: #f9f9f9
      padding: 5px
      cursor: pointer
      line-height: 0
      .toggle-line
        position: relative
        display: inline-block
        vertical-align: top
        width: 100%
        height: 2px
        margin-top: 4px
        background-color: #262a30
        &:first-child
          margin-top: 0px
  .mobile-tab-wrap
    width: 100%
    transition: all .3s
    // overflow: hidden
    border-top: 1px solid #eeeeee
    .tab
      position: relative
      width: 100%
      padding: 8px 15px
      font-size: 12px
      line-height: 1
      .iconfont
        font-size: 12px
        margin-right: 5px
@keyframes logo-name {
  from {
    margin-left: -60px;
    opacity: 0
  }
  to {
    margin-left: 0px;
    opacity: 1
  }
}
@keyframes logo-line {
  from {
    width: 0px;
  }
  to {
    width: 70px;
  }
}
</style>