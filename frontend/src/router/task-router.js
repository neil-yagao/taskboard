import lazyLoad from './lazyload';

export default {
  name: 'task-main',
  path: '/task',
  component: lazyLoad('components/main'),
  children: [
    {
      name: 'new-task',
      path: 'new-task',
      component: lazyLoad('components/tasks/overall/new-task')
    },
    {
      name: 'accept-task',
      path: 'accept-task',
      component: lazyLoad('components/tasks/overall/task-list')
    },
    {
      name: 'task-detail',
      path: 'task-detail/:id',
      component: lazyLoad('components/tasks/overall/task-detail')
    },
    {
      name: 'my-task',
      path: 'my-task',
      component: lazyLoad('components/tasks/my-tasks/my-task-main')
    }
  ]
};
