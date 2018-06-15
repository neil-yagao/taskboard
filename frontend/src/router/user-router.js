import lazyLoad from './lazyload';

export default {
	name: 'task-main',
	path: '/user',
	component: lazyLoad('components/main'),
	children: [
		{
			name: 'myself',
			path: 'myself',
			component: lazyLoad('components/user/user-panel')
		}
	]
};
