<template>
  <div id="appindex">
    <div class="content-wrap" :class="isMobile?'mobile':''">
      <!-- header -->
      <m-header />
      <!-- header 结束 -->
      <!-- content -->
      <div class="view-wrap" :style="{width: screenWidth-20+'px'}" >
        <router-view></router-view>
      </div>
      <!-- content 结束 -->
      <!-- footer -->
      <m-footer />
      <!-- footer 结束 -->
      
    </div>
    <el-backtop></el-backtop> 
  </div>  
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import mHeader from '@/components/mHeader/mHeader'
import mFooter from '@/components/mFooter/mFooter'

import ResizeMixin from '@/mixins/ResizeHandler.js'

export default {
  name:'app',
  data () {
     return {
      
     }
  },
  components:{
     mHeader,
     mFooter
  },
  computed:{
    ...mapState([
      'screenWidth',
      'isMobile'
    ])
  },
  mixins: [ResizeMixin],
  mounted:function(){
    console.log(this.screenWidth)
    // this.swidth=this.screenWidth-20+'px'
  }
}
</script>

<style lang="stylus">
*, :after, :before {
    box-sizing: border-box;
}
*
  margin: 0
  padding: 0
#appindex
  width: 100%
  min-height: 100%
  min-width: 320px
  display: flex
  flex-direction: row
  position: absolute
  .admin-wrap
    width: 100%
    position: relative
    display: flex
    flex-direction: row
    .view-wrap
      flex: 1
      min-width: 311px
      height: calc(100vh)
  .content-wrap
    flex: 1
    position: relative
    .view-wrap
      max-width: 1000px
      min-width: 320px
      margin: 0 auto
      padding: 0 10px
      min-height: calc(100vh - 120px)
      transition: width .3s
  .to-top
    position: fixed
    width: 24px
    height: 24px
    background-color: red
    right: 10px
    bottom: 15px
    padding: 5px
    z-index: 1050
    cursor: pointer
    line-height: 0
    display: flex
    flex-direction: row
    align-items: flex-start
    .to-top-line
      position: relative
      width: 2px
      height: 100%
      margin-left: 4px
      background-color: red
      &:first-child
        margin-left: 0px
.slide-fade-enter-active
  transition: all .3s ease
.slide-fade-leave-active
  transition: all .3s ease
.slide-fade-enter
.slide-fade-leave-to
  transform: translateY(20px)
  opacity: 0
.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to
  opacity: 0

</style>
