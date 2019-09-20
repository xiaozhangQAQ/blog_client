<template>
  <ul class="article-menu">
    <li v-for="item in menu" :key="item.tag">
      <span @click="toMenu(item)" :class="{'active': is(item) || isParent(item)}">{{ item.tag }} {{ item.title }}</span>
      <article-menu :menu="item.children"  v-show="isParent(item)" />
      <!-- <article-menu :menu="item.children" /> -->
    </li>
  </ul>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import articleMenu from '@/components/articleMenu/articleMenu.vue'
// import { scroll } from 'MIXINS/scroll'
export default {
  name: 'article-menu',
  props: ['menu'],
  components: {
    articleMenu
  },
  computed: {
    ...mapGetters([
      'articleMenuTag'
    ])
  },
  methods: {
    toMenu(item) {
        console.log(this.articleMenuTag)
      let top = document.getElementById(item.id).getBoundingClientRect().top
      top += document.body.scrollTop || document.documentElement.scrollTop
      this.scrollToTarget(top)
    },
    is (item) {
        console.log(this.articleMenuTag)
      return item.tag === this.articleMenuTag
    },
    isParent (item) {
        console.log(this.articleMenuTag)
        // console.log(this.articleMenuTag.indexOf(item.tag) === 0)
      return this.articleMenuTag.indexOf(item.tag) === 0
    },
    scrollToTarget (target, animation = true) {
        var timer = null
      if (!animation) {
        document.body.scrollTop = document.documentElement.scrollTop = 0
        return
      }
      let currentNum = document.body.scrollTop || document.documentElement.scrollTop
      let t = 0
      clearInterval(timer)
      let dir = 1
      if (target > currentNum) {
        dir = -1
      }
      timer = setInterval(() => {
        // 匀加速运动
        t++
        currentNum -= (2 * t * dir)
        document.body.scrollTop = document.documentElement.scrollTop = currentNum
        if ((dir === 1 && currentNum <= target) || (dir === -1 && currentNum >= target)) {
          document.body.scrollTop = document.documentElement.scrollTop = target
          clearInterval(timer)
        }
      }, 16.7)
    }
  }
}
</script>
<style lang="stylus" scoped>
.article-menu
  width: 100%
  line-height: 1.8
  font-weight: bold
  font-size: 14px
  color: #999
  list-style: none
  > li
    margin-left: 10px
    > span
      cursor: pointer
      transition: all .3s
      border-bottom: 1px solid #555555
      &.active
      &:hover
        color: #fff
</style>