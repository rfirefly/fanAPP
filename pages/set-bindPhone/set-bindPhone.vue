<template>
	<view class="body">
		<view class="phone">
			<view class="phone-code f-ac-jc">+86 </view>
			<input type="numble" placeholder="手机号" v-model="phone" />
		</view>
		<view v-show="!this.isbind" class="password-input">
			<input type="numble" placeholder="请输入验证码" v-model="phoneCode" />
			<view @tap="getPhoneCode" class="password-input-forget f-jc">{{!phoneCodeTime ? "获取验证码" : phoneCodeTime+'s'}}</view>
		</view>
		<button type="primary" class="set-btn" @tap="submit" :class="{'set-btn-disable':disabledPhone}" :disabled="disabledPhone">{{this.isbind?"已绑定":"完成"}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isbind: false,
				phone: "",
				phoneCode: "",
				phoneCodeTime: 0,
				disabledPhone: true,
			}
		},
		onLoad(e) {
			if (e.phone !== "false" && e.phone && e.phone !== 'null') {
				this.isbind = true;
				this.phone = e.phone;
			}
		},
		watch: {
			phone(val) {
				this.change();
			},
			phoneCode(val){
				this.change();
			}
		},
		methods: {
			change(){
				if(this.phone && this.phoneCode){
					this.disabledPhone = false;
				}
				return;
			},
			async submit(){
				let [err,res] = await this.$http.post('/user/bindPhone',{
					phone:this.phone,
					code:this.phoneCode
				},{
					token:true,
					checkToken:true,
				});
				// 请求失败处理
				if (!this.$http.errorCheck(err,res)) return;
				// 成功
				this.isbind = true;
				this.disabledPhone = false;
				uni.showToast({ title: '绑定成功！'});
				// 修改状态，保存缓存
				let data = res.data.data;
				if (typeof data === 'boolean') {
					this.User.userinfo.phone = this.phone;
				}else{
					this.User.userinfo = this.User.__formatUserinfo(data);
				}
				uni.setStorageSync("userinfo",this.User.userinfo);
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
			},
			
		}
	}
</script>

<style>
	@import "../../common/form.css";
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
		width: 65rpx;
		left: 20rpx;
		top: 4rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #666666;
	}
</style>
