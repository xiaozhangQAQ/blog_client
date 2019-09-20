<template>
  <div id="home">
    <div class="home_view">
      <aside class="home_aside" v-if="!isMobile">
          <categories :categoriesC = 'categories' :tagsC = 'tags'/>
      </aside>
      <div class="home_contain" v-loading="loading">
         <div v-if="articleList.length>0" >
          <article-card
            v-for="(article, index) in articleList"
            :key="index"
            :article="article"/>
          <!-- 分页 -->
          <div
            class="pagination"
            v-show="total > 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              @current-change="pageChange"
              :current-page="currentPage"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <!-- 分页 结束 -->
        <no-data
        v-if="nodatas"
          text="没有找到文章~"/> 
      </div>
    </div>
    
    <!-- <left-nav v-if="!isAdminWrap" /> -->
    <!-- 移动端显示弹出左边分类按钮 -->
    <div class="left_nav_btn"  v-if="isMobile" @click="drawer = true">分类</div>
    
    <!-- 左边分类弹框 -->
    <el-drawer
      title=""
      :visible.sync="drawer"
      :direction="direction"
      :size = "isMobile?'50%':'30%'"
      >
      <div style="height:100%;overflow:auto;">
          <categories style="height:100%;" :categoriesC = 'categories' :tagsC = 'tags'/>
      </div>
      
    </el-drawer> 

    
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
// import { scroll } from 'MIXINS/scroll'
import articleCard from '@/components/articleCard/articleCard'
import categories from '@/components/categories/categories'
import noData from '@/components/noData/noData'
// import leftNav from '@/components/navDrawer/leftNav'
import { setTimeout } from 'timers';
import {getBlogCategoryList,getBlogTagList,getLists} from '@/api/home.js'

import ResizeMixin from '@/mixins/ResizeHandler.js'

export default {
  name: 'home',
  components: {
    categories,
    articleCard,
    noData
  },
  mixins: [ResizeMixin],
  // mixins: [scroll],
  data () {
    return {
      nodatas:false,
      articleList: [],
      categories:[],
      tags:[],
      page: 0,
      pageSize: 10,
      currentPage: 0,
      total: 0,
      loading: true,
      drawer: false,
      direction: 'ltr',
    }
  },
  computed:{
    ...mapState([
      'isMobile'
    ])
  },
  created() {
    this.page = 0;
    this.getList();
  },
  methods: {
    // ...mapActions([
    //   'getBlogArticleList'
    // ]),
    pageChange(currentPage) {
      // this.scrollToTarget(0, false)
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList() {
      this.loading = true;
       getLists({
          page: this.page,
          pageSize: this.pageSize
        }).then((data) => {
         
          this.total = data.data.count
          this.articleList = data.data.list       
          // if(!this.articleList){
          //   this.nodatas = true;
          // }
          this.loading = false
        })
        .catch(()=> {
          this.nodatas = true;
          this.articleList = [];
          this.loading = false;
        })

        getBlogCategoryList()
        .then((data) => {
          this.categories = data.data.list
        })
        .catch(()=> {
          this.categories = []
        })

        getBlogTagList()
        .then((data) => {
          this.tags = data.data.list
        })
        .catch(()=> {
          this.tags = []
        })
      // this.getBlogArticleList({
      //     page: this.page,
      //     pageSize: this.pageSize
      //   })
      //   .then((data) => {
      //     this.total = data.count
      //     this.articleList = data.list
      //     this.loading = false
      //   })
      //   .catch(()=> {
      //     this.articleList = []
      //     this.loading = false
      //   })
    }
  }
}
</script>

<style lang="stylus" scoped>
#home
  .left_nav_btn
    position: fixed
    width: 40px
    height: 40px
    background-color: #262a30
    left: 10px
    bottom: 45px
    padding: 5px
    z-index: 1050
    cursor: pointer
    color: #fff
    line-height: 30px
    font-size: 10px
    border-radius: 50%
    cursor: pointer
  .home_view
    display: flex
    display: -webkit-flex
    .home_contain
      flex:1
    .home_aside
      width 300px
      border 1px solid #eee
      margin-right 10px  
      height fit-content
      min-height 230px
  position: relative
  padding: 30px 10px
  min-height: 100px
  .pagination
    width: 100%
    padding: 10px 0
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    background-color: #fff
.slide-fade-enter
.slide-fade-leave-to
  opacity: 0
</style>
