<template>
	<div class="pass-login-sms">
		<p class="pass-form-item">
			<input v-model="phone" type="text" class="pass-text-input" maxlength="11" placeholder="手机号">
		</p>
		<p class="pass-form-item">
			<input v-model="code" type="text" class="pass-text-input" maxlength="6" placeholder="短信验证码">
			<button class="pass-item-timer" :class="{'disabled':phone.length<11||time!=0}"
				:disabled="phone.length<11||time!=0" @click="sendCode">
				<span v-if="time==0">发送验证码</span>
				<span v-else>{{time}}s</span>
			</button>
		</p>
		<span class="pass-sms-agreement pass-link">
			<input v-model="checkbox" type="checkbox" class="pass-checkbox-input" autocomplete="off">
			<label style="padding-left: 5px;">我已阅读并同意</label>
			<a href="javascript:void(0)">易格用户协议</a> 和 <a href="javascript:void(0)">隐私政策</a>
		</span>
		<p class="pass-form-item pass-form-item-submit">
			<input type="submit" value="登录/注册" class="pass-button pass-button-submit"
				:disabled="!checkbox||phone==''||code==''" :class="{'disabled':!checkbox||phone==''||code==''}"
				@click="submit">
		</p>
	</div>
</template>

<script setup>
	import {
		ElNotification
	} from 'element-plus'
	import {
		ref
	} from 'vue'
	import {
		sendCode as messageSendCode
	} from '../../api/message.js'
	import {
		loginPhone
	} from '../../api/account.js'

	const emit = defineEmits(['success'])
	const checkbox = ref(false)
	const time = ref(0)
	const phone = ref('')
	const code = ref('')
	const loading = ref(false)

	const submit = async () => {
		loading.value = true
		try {
			const res = await loginPhone(phone.value, code.value)
			emit('success', res)
		} catch (e) {
			ElNotification({
				title: '登录失败',
				message: '请检查输入是否正确。',
				type: 'warning',
			})
		}
		loading.value = false
	}
	const sendCode = async () => {
		time.value = 60
		const res = await messageSendCode(phone.value)
		if (res) {
			const intervalId = setInterval(() => {
				time.value--;
				if (time.value == 0) clearInterval(intervalId)
			}, 1000)
			ElNotification({
				title: '信息',
				message: '短信发送成功。',
				type: 'success',
			})
		} else {
			ElNotification({
				title: '信息',
				message: '短信发送失败。',
				type: 'warning',
			})
		}
	}
</script>

<style scoped lang="scss">
	.pass-login-sms {
		padding-top: 20px;

		.pass-form-item {
			position: relative;

			.pass-item-timer {
				display: block;
				width: 100px;
				transition: .3s;
				border: 0;
				z-index: 2;
				background: #fff;
				border-left: 1px solid #c5ccdb;
				color: #151b26;
				font-size: 14px;
				line-height: 20px;
				padding: 0 12px;
				position: absolute;
				right: 1px;
				top: 10px;
				cursor: pointer;

				&.disabled {
					opacity: .4;
					cursor: no-drop;
				}
			}
		}
	}
</style>