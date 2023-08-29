import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		// 동적라우팅, 여러 url을 하나에 매핑하고 싶을 때 사용
		// /user/alice
		// /user/bruce -> PostDetailView
		// /user/tom
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
		// props: true,
		props: route => ({
			id: parseInt(route.params.id),
		}),
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},

	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		children: [
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},

	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
];

const router = createRouter({
	// SEO(검색옵션 최적화) 때문에 해쉬모드 대신 히스토리 모드를 사용해서 배포하자.
	// 근데 히스토리 모드는 좀 귀찮다.
	history: createWebHistory('/'),
	// history: createWebHashHistory(),
	routes,
});

export default router;
