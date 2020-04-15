<template>
	<!-- 第三方登入 -->
	<view class="f-ac-jc third-login">

		<block v-for="(value,index) in providerList" :key="index">
			<view class="login-item" @tap="tologin(value)">
				<view class="icon iconfont" :class="['icon-'+value.icon]"></view>
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		props: {
			noback: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				providerList: []
			}
		},
		onReady() {
			this.getLoginAuth();
		},
		methods: {
			// 获取当前登录渠道
			getLoginAuth() {
				uni.getProvider({
					service: 'oauth',
					success: (result) => {
						this.providerList = result.provider.map((value) => {
							let providerName = '';
							let icon = '';
							switch (value) {
								case 'weixin':
									providerName = '微信登录';
									icon = 'weixin';
									break;
								case 'qq':
									providerName = 'QQ登录';
									icon = 'QQ';
									break;
								case 'sinaweibo':
									providerName = '新浪微博登录';
									icon = 'xinlangweibo';
									break;
								case 'alipay':
									providerName = '支付宝登录';
									icon = '';
									break;
							}
							return {
								name: providerName,
								icon: icon,
								id: value
							}
						});
					},
					fail: (error) => {
						console.log('获取登录通道失败', error);
					}
				});
			},
			// 登录
			tologin(provider) {
				uni.login({
					provider: provider.id,
					success: (res) => {

						uni.getUserInfo({
							provider: provider.id,
							success: (infoRes) => {
								let data = this.User.__formatOtherLogin(provider.id, Object.assign(infoRes, res));
								this.loginEvent(data);
							}
						});

						// 更新保存在 store 中的登录状态
						console.log('登录成功，保存到本地存储，修改当前用户登录状态')
					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});
			},
			async loginEvent(data){
				let res = await this.User.login({
					url:'/user/thirdLogin',
					data:data,
					Noback:this.noback
				});
			}
		}
	}
</script>

<style>
	.third-login {
		margin-top: 40rpx;
	}

	.third-login .login-item {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		text-align: center;
		margin: 0 40rpx;
		color: #FFFFFF;
		overflow: hidden;
	}

	.third-login .login-item>view {
		font-size: 55rpx;
		line-height: 100rpx;
	}

	.third-login .login-item .icon-weixin {
		background: #2BD19B;
	}

	.third-login .login-item .icon-xinlangweibo {
		background: #FC7729;
	}

	.third-login .login-item .icon-QQ {
		background: #2CAEFC;
	}
</style>
