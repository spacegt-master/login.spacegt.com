<template>
</template>

<script setup>
	import Cookies from 'universal-cookie';
	import {
		onMounted
	} from 'vue'
	import {
		useRouter,
		useRoute
	} from 'vue-router'

	const route = useRoute()
	const router = useRouter()

	onMounted(() => {
		const cookies = new Cookies(null, {
			path: '/'
		})
		cookies.remove('USER_CERTIFICATE')
		const parent = window.opener || window.parent
		parent.postMessage('logout-success', route.query.origin);

		router.replace('/')
	})
</script>