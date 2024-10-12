<template>
	<div class="page-wrap">
		<div class="core-up-right-corner" v-show="corner=='login'" @click="corner='register'">注册</div>
		<div class="core-up-right-corner" v-show="corner=='register'" @click="corner='login'">登录</div>
		<login-vue v-show="corner=='login'" @success="handleSuccess"></login-vue>
		<register-vue v-show="corner=='register'" @success="handleSuccess"></register-vue>
		<el-result v-if="origin==null" icon="error" title="Error Tip"
			sub-title="Please check the parameters"></el-result>
	</div>
</template>

<script setup>
	import Cookies from 'universal-cookie';
	import user_certificate from '../utils/user_certificate.js'
	import loginVue from '../components/login-wrap/login.vue';
	import registerVue from '../components/register-wrap/register.vue';
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useRoute
	} from 'vue-router'

	const route = useRoute()
	const corner = ref('login')
	const cookies = new Cookies()
	const origin = ref()

	const handleSuccess = () => {
		const parent = window.opener || window.parent
		parent.postMessage('login-success', origin.value);
	}

	onMounted(() => {
		if (route.query.origin) origin.value = route.query.origin;
		parent.postMessage('login-loaded', origin.value);
		if (cookies.get('USER_CERTIFICATE')) {
			try {
				const check = user_certificate.verify(cookies.get('USER_CERTIFICATE'))
				if (check) handleSuccess()
			} catch (e) {}
		}
	})
</script>

<style scoped lang="scss">
	.page-wrap {
		position: absolute;
		left: calc(50% - 300px);
		top: calc(50% - 250px);
		height: 480px;
		width: 600px;
		align-items: center;
		background: #fff;
		border-radius: 12px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 50px 0 0;
		overflow: hidden;

		.core-up-right-corner {
			background-image: url(../assets/reg-subscript.png);
			background-size: cover;
			box-sizing: border-box;
			color: #fff;
			cursor: pointer;
			font-size: 14px;
			line-height: 33px;
			padding: 0 16px 0 36px;
			position: absolute;
			right: 0;
			top: 0;
			width: 80px;
		}
	}

	.el-result {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 5;
	}

	@media (max-width:768px) {
		.page-wrap {
			height: 100vh;
			width: 100vw;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			padding: calc(50vh - 200px) 0 0;
		}
	}

	@media (max-height:600px) {
		.page-wrap {
			height: 100vh;
			width: 100vw;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			padding: calc(50vh - 200px) 0 0;
		}
	}
</style>