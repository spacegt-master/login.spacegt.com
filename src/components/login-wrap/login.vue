<template>
	<div class="passport">
		<div class="login-type-tab">
			<div class="tab-btn" :class="{ 'active': loginType == 'yigee' }" @click="loginType = 'yigee'; tab = 'sms';">
				易格账号</div>
			<div class="tab-btn" :class="{ 'active': loginType == 'aimoso' }"
				@click="loginType = 'aimoso'; tab = 'sms';">墨子账号
			</div>
		</div>
		<div class="pass-login yigee" v-if="loginType == 'yigee'">
			<div class="componseLeft">
				<p class="login-type-tab">
					<span class="switch-item" :class="{ 'active': tab == 'sms' }" @click="tab = 'sms'">短信登录</span>
					<span class="switch-item" :class="{ 'active': tab == 'normal' }" @click="tab = 'normal'">账号登录</span>
				</p>
				<login-sms-vue v-if="tab == 'sms'" @success="handleSuccess"></login-sms-vue>
				<login-normal-vue v-if="tab == 'normal'" @success="handleSuccess"></login-normal-vue>
			</div>
			<div class="pass-vertical-separate-line"></div>
			<div class="componseRight">
				<login-qrcode-vue></login-qrcode-vue>
			</div>
		</div>
		<div class="pass-login aimoso" v-if="loginType == 'aimoso'">
			<div class="componseLeft">
				<aimoso-login-sms-vue v-if="tab == 'sms'" @success="handleSuccess"></aimoso-login-sms-vue>
			</div>
		</div>
	</div>
</template>

<script setup>
import Cookies from 'universal-cookie';
import user_certificate from '../../utils/user_certificate.js'
import loginSmsVue from './login-sms.vue';
import loginQrcodeVue from './login-qrcode.vue';
import loginNormalVue from './login-normal.vue';
import aimosoLoginSmsVue from './aimoso-login-wrap/login-sms.vue'
import {
	ref,
	onMounted
} from 'vue'
import {
	useRoute
} from 'vue-router'

const route = useRoute()
const emit = defineEmits(['success'])
const loginType = ref('yigee') // yigee aimoso
const tab = ref('sms')

const handleSuccess = (data) => {
	if (data.id) {
		const cookies = new Cookies(null, {
			path: '/',
			domain: route.query.domain ? route.query.domain : window.location.hostname
		})
		// 为用户创建30天有效证书
		const USER_CERTIFICATE = user_certificate.create(data.id, new Date().getTime() + 1000 * 60 * 60 * 24 * 30)
		cookies.set('USER_CERTIFICATE', USER_CERTIFICATE)
		cookies.set('LOGIN_MODE', data.mode)
		emit('success')
	}
}

onMounted(() => {
	if (route.query['aimoso-org'])
		loginType.value = 'aimoso'
})
</script>

<style scoped lang="scss">
.passport {
	align-items: center;
	display: flex;
	flex-direction: column;
}

.login-type-tab {
	display: flex;
	align-items: center;
	gap: 40px;

	.tab-btn {
		color: #84868c;
		cursor: pointer;
		font-size: 24px;
		font-weight: 400;
		line-height: 32px;

		&:hover {
			color: #2468f2 !important;
		}

		&.active {
			color: #151b26;
			font-size: 28px;
			font-weight: 500;
			line-height: 36px;
		}
	}
}

.pass-login {
	border-bottom: none;
	padding-top: 44px;
	display: flex;

	.componseLeft {
		.login-type-tab {
			color: #191a24;
			display: flex;
			font-size: 16px;
			font-weight: 400;
			justify-content: space-between;
			letter-spacing: 0;
			line-height: 24px;
			margin: 0;
			padding: 0 62px;

			.switch-item {
				cursor: pointer;
				color: #858585;
				position: relative;
				font-weight: 400;
				padding-bottom: 6px;

				&:hover {
					color: #2468f2;
				}

				&.active {
					color: #2468f2;
					border-bottom: 2px solid #2468f2;
				}
			}
		}
	}

	.pass-vertical-separate-line:after {
		background-image: linear-gradient(1deg, hsla(216, 6%, 84%, .15), hsla(216, 6%, 84%, .5) 16%, #d4d6d9 45%, hsla(216, 6%, 84%, .5) 82%, hsla(216, 6%, 84%, .15));
		content: "";
		display: block;
		height: 280px;
		margin: 0 24px;
		transform: scaleX(-1);
		width: 1px;
	}

	.componseRight {
		color: #151b26;
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0;
		line-height: 24px;
		margin: 0 0 34px;
		text-align: center;
	}

	&:deep(.pass-text-input) {
		border: 1px solid #d4d6d9;
		border-radius: 8px;
		box-sizing: border-box;
		box-shadow: inset 0 0 0 1000px #fff;
		font-size: 14px;
		height: 40px;
		line-height: 20px;
		padding: 9px 12px;
		width: 300px;

		&:focus {
			border: 1px solid #2468f2;
		}
	}

	&.aimoso:deep(.pass-text-input) {
		width: 350px;
	}

	&:deep(.pass-sms-agreement) {
		line-height: 14px;
		display: inline-block;
		color: #151b26;
		font-size: 12px;
		margin-bottom: 12px;
		margin-top: 12px;

		.pass-checkbox-input {
			position: relative;
			top: -1px;
			vertical-align: middle;
			box-shadow: none;
			color: #d4d6d9;
			height: 16px;
			width: 16px;
		}

		a {
			margin: 0;
			padding: 0;
			list-style: none;
			text-decoration: none;
			line-height: 14px;
			color: #2468f2;
			font-size: 12px;
			margin-left: 0;
		}
	}


	&:deep(.pass-button-submit) {
		background: #2468f2;
		background-image: -webkit-linear-gradient(top, #2468f2, #2468f2);
		border: none;
		border-radius: 8px;
		box-shadow: none;
		color: #fff;
		cursor: pointer;
		display: block;
		font-size: 14px;
		font-weight: 400;
		height: 40px;
		letter-spacing: 4px;
		line-height: 40px;
		margin-top: 0;
		width: 100%;

		&.disabled {
			opacity: .4;
			cursor: no-drop;
		}
	}

	&:deep(.pass-form-item-submit) {
		margin: 0;
	}

	::placeholder {
		color: #bbbbbb;
	}
}
</style>