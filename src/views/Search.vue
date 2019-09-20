<template>
  <div id="search">
    <el-row class="demo-autocomplete" style="width:100%;">
      <el-col :span="24">
        <el-autocomplete
          class="inline-input"
          v-model="searchValue"
          :fetch-suggestions="querySearch"
          placeholder="请输入关键字"
          @select="handleSelect"
          :clearable = "true"
          :autofocus = 'true'
          @keyup.enter.native="toSearch"
          style="width:100%;margin-bottom:10px;"
        ></el-autocomplete>
      </el-col>
    </el-row>

    <div class="search-article-wrap">
      <article-card2
        v-for="(article, index) in articleList"
        :key="index"
        :article="article" />
    </div>
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
    <!-- 分页 结束 -->
    <no-data
      v-if="total === 0"
      text="没有找到文章~"/>
  </div>
</template>

<script>
import articleCard2 from '@/components/articleCard/articleCard2'
import noData from '@/components/noData/noData'
import {searchArticle} from '@/api/search.js'

export default {
  name: 'search',
  components: {
   articleCard2,
   noData
  },
  data() {
    return {
      page: 0,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      type: 'category',
      id: '',
      articleList: [],
      loading: false,
      restaurants: [],
      searchValue: ''
    };
  },    
  computed:{
    // ...mapState([
    //   'isMobile'
    // ])
  },
  watch: {
    $route(route) {
      this.initData()
    }
  },
  methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },     
      loadAll() {
        return [
          { "value": "vue"}
        ];
      },
      handleSelect(item) {
        this.searchValue = item.value;
        if(this.$route.query.value === this.searchValue){
          return 
        }
        this.$router.push({
          name: 'Search',
          query: {
            value: this.searchValue
          }
        })
      },
      toSearch() {
        if (this.searchValue === '') {
          this.$toast('搜索内容不能为空', 'error')
          return
        }
        if(this.$route.query.value === this.searchValue){
          return 
        }
        this.$router.push({
          name: 'Search',
          query: {
            value: this.searchValue
          }
        })
      },
      initData() {
        this.searchValue = this.$route.query.value
        this.total = 0
        this.articleList = []
        this.page = 0
        if (this.searchValue || this.searchValue == '0') {
          this.getList()
        } else {
          // document.getElementById('search-input').focus()
        }
      },
      pageChange(currentPage) {
        this.scrollToTarget(0, false)
        this.page = currentPage - 1
        this.currentPage = currentPage
        this.getList()
      },
      getList() {
        this.loading = true
        searchArticle({
            searchValue: this.searchValue,
            page: this.page,
            pageSize: this.pageSize
          })
          .then((data) => {
            console.log(data)
            this.total = data.data.count
            this.articleList = data.data.list
            this.loading = false
          })
          .catch(()=> {
            this.articleList = []
            this.loading = false
          })
      },
    },
    mounted() {
      this.restaurants = this.loadAll();
      this.initData()
    }
}
</script>

<style lang="stylus" scoped>
#search
  position: relative
  padding: 30px 10px
  display: -ms-flexbox
  display: flex
  -ms-flex-direction: column
  flex-direction: column
  -ms-flex-align: center
  align-items: center
  .pagination
    width: 100%
    padding: 10px 0
    display: -ms-flexbox
    display: flex
    display: -webkit-flex
    -ms-flex-direction: row
    flex-direction: row
    -ms-flex-pack: center
    justify-content: center
    background-color: #fff
</style>