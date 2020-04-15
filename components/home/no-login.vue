<template>
	<view>
		<view class="f-ac-jc title">登入仿App，体验更多</view>
		<!-- 第三方登入 -->
		<third-login :noback="true"></third-login>
		<!-- 账号密码登入 -->
		<view class="account-login f-ac-jc" @tap="openLogin">账号密码登入<view class="icon iconfont icon-jinru"></view></view>
	</view>
</template>

<script>
	import thirdLogin from '../common/third-login.vue'
	
	export default {
		components: {
			thirdLogin
		},
		methods: {
			openLogin() {
				uni.navigateTo({
					url:'../../pages/login/login'
				})
			}
		},
	}
</script>

<style scoped>
	.title {
		margin-top: 20rpx;
		color: #888888;
	}
	
	.account-login {
		margin-top: 30rpx;
		color: #888888;
	}
	
</style>
