import Vue from 'vue'
import Router from 'vue-router'
import WorkingMainBeforeLogin from '@/components/working-page.vue'
import taskRouter from './task-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'working-main',
      component: WorkingMainBeforeLogin,
      children:[taskRouter]
    }
  ]
})
