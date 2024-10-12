import {
	createRouter,
	createWebHistory
} from 'vue-router';

export const generalRoutes = [{
	path: '/',
	redirect: '/login',
	children: [{
		path: 'login',
		name: 'Login',
		component: () => import('../pages/login.vue')

	}, {
		path: 'logout',
		name: 'Logout',
		component: () => import('../pages/logout.vue')

	}]
}]


const router = createRouter({
	history: createWebHistory(),
	routes: generalRoutes
})

export default router