<script setup>
	import Cookies from 'universal-cookie';
	import {
		onMounted
	} from 'vue'
	import {
		useRouter
	} from 'vue-router'

	const router = useRouter()

	onMounted(() => {
		const cookies = new Cookies(null, {
			path: '/'
		})
		cookies.remove('USER_CERTIFICATE')
		router.replace('/')
	})
</script>