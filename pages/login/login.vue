<template>
	<view>
		<!-- 状态栏 -->
		<uni-status-bar bgcolor="#FFE933"></uni-status-bar>
		<!-- 登入头部 -->
		<view class="content">
			<image src="../../static/common/loginhead.png" mode="widthFix"></image>
			<view class="icon iconfont icon-guanbi" @tap="back"></view>
		</view>
		<!-- 账号登入 -->
		<view class="body" v-if="isAccount">
			<input type="text" placeholder="昵称/手机号/邮箱" v-model="account" />
			<view class="password-input">
				<input type="password" placeholder="请输入密码" v-model="psd" />
				<view class="password-input-forget f-jc">忘记密码？</view>
			</view>
			<button type="primary" class="set-btn" @tap="submit" :class="{'set-btn-disable':disabledAccount}" :disabled="disabledAccount">完成</button>
		</view>
		<!-- 手机验证码登入 -->
		<view class="body" v-else>
			<view class="phone">
				<view class="phone-code f-ac-jc">+86</view>
				<input type="numble" placeholder="手机号" v-model="phone" />
			</view>
			<view class="password-input">
				<input type="numble" placeholder="请输入验证码" v-model="phoneCode" />
				<view @tap="getPhoneCode" class="password-input-forget f-jc">{{!phoneCodeTime ? "获取验证码" : phoneCodeTime+'s'}}</view>
			</view>
			<button type="primary" class="set-btn" @tap="submit" :class="{'set-btn-disable':disabledPhone}" :disabled="disabledPhone">完成</button>
		</view>
		<!-- 验证码登入 -->
		<view class="verification-code-login f-ac-jc" @tap="loginBy">{{isAccount?"验证码登入":"账号登入"}}
			<view class="icon iconfont icon-jinru"></view>
		</view>
		<!-- 第三方登录 -->
		<view class="other-login">
			<view class="other-login-title f-ac-jc">通过第三方登入</view>
			<third-login :noback="false"></third-login>
			<view class="other-login-protocol f-ac-jc">
				注册代表您同意<view>《XXX协议》</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue';
	import thirdLogin from '../../components/common/third-login.vue'
	export default {
		components: {
			uniStatusBar,
			thirdLogin
		},
		data() {
			return {
				account: "",
				psd: "",
				phone: "",
				phoneCode: "",
				phoneCodeTime: 0,
				disabledPhone: true,
				disabledAccount: true,
				isAccount: true
			}
		},
		methods: {
			submit() {
				if (this.isAccount) {
					// 账号密码登入
					this.User.login({
						url: '/user/login',
						data: {
							username: this.account,
							password: this.psd
						}
					});
					return;
				}
				// 再次验证手机号
				if (!this.isPhone()) return uni.showToast({ title: '请勿修改手机号', icon:none });
				// 验证码登入
				this.User.login({
					url:"/user/phoneLogin",
					data:{
						phone:this.phone,
						code:this.phoneCode
					}
				});
				return;
			},
			back() {
				uni.navigateBack({
					delta: 1,
					animationType: "fade-out",
					animationDuration: 300
				})
			},
			changeAccount() {
				if (this.account && this.psd) {
					this.disabledAccount = false;
					return;
				}
				this.disabledAccount = true;
			},
			changePhone() {
				if (this.phone && this.phoneCode) {
					this.disabledPhone = false;
					return;
				}
				this.disabledPhone = true;
			},
			loginBy() {
				this.isAccount = !this.isAccount;
			},
			isPhone() {
				let mPattern = /^1[34578]\d{9}$/;
				return mPattern.test(this.phone);
			},
			async getPhoneCode() {
				if (this.phoneCodeTime > 0) return;
				// 手机号校验
				if (!this.isPhone()) return uni.showToast({title: '请输入正确的手机号',icon: 'none'});
				
				// 请求服务器，发送验证码
				let [err,res] = await this.$http.post('/user/sendCode',{
					phone:this.phone
				});
				// 请求失败处理
				if (!this.$http.errorCheck(err,res) || res.data.errorCode === 10001) return uni.showToast({title: '验证码已发送，请稍后再试',icon: 'none'});
				// 服务器开始发送验证码
				uni.showToast({
					title: '验证码为:'+res.data.data.code
				});
				this.phoneCodeTime = this.config.codeTime;
				let timer = setInterval(() => {
					this.phoneCodeTime--;
					if (this.phoneCodeTime < 1) {
						clearInterval(timer);
						this.phoneCodeTime = 0;
					}
				}, 1000)
			}
		},
		watch: {
			account(val) {
				this.changeAccount();
			},
			psd(val) {
				this.changeAccount();
			},
			phone(val) {
				this.changePhone();
			},
			phoneCode(val) {
				this.changePhone();
			}
		},
	}
</script>

<style>
	@import url("../../common/form.css");

	.content {
		height: 450rpx;
		position: relative;
	}

	.content>image {
		width: 100%;
	}

	.content .icon {
		position: absolute;
		top: 25rpx;
		left: 25rpx;
		display: inline-block;
		font-size: 40rpx;
		font-weight: bold;
	}

	.verification-code-login {
		margin-top: 30rpx;
		color: #888888;
	}

	.other-login {
		margin-top: 30rpx;
	}

	.other-login .other-login-title {
		position: relative;
	}

	.other-login .other-login-title::before,
	.other-login .other-login-title::after {
		content: '';
		width: 100rpx;
		height: 1rpx;
		position: absolute;
		background: #CCCCCC;
		top: 50%;
	}

	.other-login .other-login-title::before {
		right: 20%;
	}

	.other-login .other-login-title::after {
		left: 20%;
	}

	.other-login .other-login-protocol {
		margin-top: 80rpx;
	}

	.other-login .other-login-protocol>view {
		color: #09BB07;
	}


	.password-input {
		position: relative;
	}

	.password-input>input {
		padding-right: 170rpx;
	}

	.password-input .password-input-forget {
		position: absolute;
		height: 100%;
		width: 150rpx;
		right: 20rpx;
		top: 0;
		color: #A3A3A3;
	}

	.phone {
		position: relative;
	}

	.phone>input {
		padding-left: 70rpx;
	}

	.phone .phone-code {
		position: absolute;
		padding-bottom: 20rpx;
		width: 70rpx;
		left: 20rpx;
		top: 6rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #666666;
	}
</style>
