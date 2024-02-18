import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import HomePage from '@/views/index'
export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      component: HomePage
    }
  ]
})
