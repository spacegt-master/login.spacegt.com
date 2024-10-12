<template>
	<p class="hide-logo-text">扫码登录</p>
	<div class="qrcode">
		<img src="../../assets/qrcode.jpg">
	</div>
	<div class="qrcode-foot-bar">
		<div>易格智能云 APP</div>
		<div>扫描二维码登录</div>
	</div>
</template>

<script>
</script>

<style scoped lang="scss">
	.qrcode {
		background-color: #fff;
		border: 1px solid #e8e9eb;
		border-radius: 8px;
		box-sizing: content-box;
		height: 150px;
		padding: 5px;
		width: 150px;
		margin-left: 0px;
		display: block;
		visibility: visible;
		opacity: 1;
			
		img {
			height: 150px;
			width: 150px;
		}
	}
			
	.qrcode-foot-bar {
		color: #848b8c;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0;
		line-height: 20px;
		text-align: center;
	}
</style>