// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import store from './store/store'
import base from './base'
import Scroller from 'vue-scroller'
Vue.use(Scroller)

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(base)
const i18n = new VueI18n({
  // 语言标识
  locale: 'zh-CN'
})
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  Scroller,
  components: {App},
  template: '<App/>'
})
