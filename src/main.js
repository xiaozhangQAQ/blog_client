import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';

import App from './App.vue'
import router from './router'
import store from './store/index'

import Highlight from './util/mHighlight'
import photoPreview from '@/components/photoPreview'
// import './mock.js'

const time = (value, formatString = 'YYYY-MM-DD HH:mm') => {
  return moment(parseInt(value) * 1000).format(formatString)
}

Vue.filter('time', time)

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Highlight);
Vue.use(photoPreview);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
