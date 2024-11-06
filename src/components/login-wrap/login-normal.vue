<template>
	<div class="pass-login-normal">
		<p class="pass-form-item">
			<input v-model="account" type="text" class="pass-text-input" placeholder="手机号/用户名/邮箱">
		</p>
		<p class="pass-form-item">
			<input v-model="password" type="password" class="pass-text-input" placeholder="密码">
		</p>
		<span class="pass-sms-agreement pass-link">
			<input v-model="checkbox" type="checkbox" class="pass-checkbox-input" autocomplete="off">
			<label style="padding-left: 5px;">我已阅读并同意</label>
			<a href="javascript:void(0)">易格用户协议</a> 和 <a href="javascript:void(0)">隐私政策</a>
		</span>
		<p class="pass-form-item pass-form-item-submit">
			<input type="submit" value="登录" class="pass-button pass-button-submit"
				:disabled="!checkbox || account == '' || password == ''"
				:class="{ 'disabled': !checkbox || account == '' || password == '' }" @click="submit">
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
	loginAccount
} from '../../api/account.js'

const emit = defineEmits(['success'])
const checkbox = ref(false)
const account = ref('')
const password = ref('')
const loading = ref(false)

const submit = async () => {
	loading.value = true
	try {
		const res = await loginAccount(account.value, password.value)
		emit('success', {
			id: res.id,
			mode: 'yigee'
		})
	} catch (e) {
		ElNotification({
			title: '登录失败',
			message: '请检查输入是否正确。',
			type: 'warning',
		})
	}
	loading.value = false
}
</script>

<style scoped lang="scss">
.pass-login-normal {
	padding-top: 20px;
}
</style>