<template>
	<router-view></router-view>
</template>
<script setup>

</script>
<style lang="scss">
	* {
		outline: none;
	}

	html,
	body,
	#app {
		height: 100vh;
		width: 100vw;
		margin: 0;
		overflow: hidden;
	}

	body {
		background-image: url(./assets/bg.jpg);
		background-size: cover;
		background-position: center;

	}
</style>