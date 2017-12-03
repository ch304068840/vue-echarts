import Vue from 'vue'
import Router from 'vue-router'
import jlpm from '@/components/jlpm'
import nongye from '@/components/nongye'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'jlpm',
      component: jlpm
    },
     {
      path: '/nongye',
      name: 'nongye',
      component: nongye
    }
  ]
})
