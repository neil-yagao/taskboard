import Vue from 'vue'
import Router from 'vue-router'
import WorkingMainBeforeLogin from '@/components/working-page.vue'
import Register from '@/components/register.vue'
import Login from '@/components/login.vue'
import taskRouter from './task-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'working-main',
      component: WorkingMainBeforeLogin,
      children:[taskRouter]
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})
