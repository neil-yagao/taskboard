import lazyLoad from './lazyLoad'

export default {
  name:'task-main',
  path:'/task',
  component: lazyLoad('components/tasks/main'),
  children:[{
    name:'new-task',
    path:'new-task',
    component:lazyLoad('components/tasks/new-task')
  },{
    name:'accept-task',
    path:'accept-task',
    component:lazyLoad('components/tasks/task-list')
  }
]
}
