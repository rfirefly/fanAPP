<template>
	<view class="select f-ac-jsb" hover-class="select-hover" @tap="click">
		<view class="left f-ac-jc">
			<view class="icon iconfont" :class="item.icon" :style="{'color':item.iconColor}" v-if="item.icon"></view>
			<view class="text">{{item.name}}</view>
		</view>
		<template v-if="item.data">
			<view class="right">{{item.data}}</view>
		</template>
		<template v-else>
			<view class="right icon iconfont icon-jinru"></view>
		</template>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		methods:{
			click(){
				switch (this.item.clickType){
					case "navigateTo":
						if (this.item.url) {
							uni.navigateTo({
								url:this.item.url
							});
						}
						break;
					case "clear":
						uni.showModal({
							title:"清除缓存",
							content:"是否清除全部缓存？",
							confirmText:"清除",
							success: (res) => {
								if(res.confirm){
									uni.clearStorage();
									this.User.logout(false);
									uni.showToast({
										title:"清除成功"
									})
								}
							}
						})
						break;
					case "bind":
						if (this.hasBind(this.item.provider)) return;
						this.bindThird();
						break;
					default:
						break;
				}
			},
			hasBind(provider){
				for (let i in this.User.userbind) {
					if(this.User.userbind[i].type == provider) return true;
				}
				return false;
			},
			async bindThird(){
				uni.login({
					provider: this.item.provider,
					success: (res) => {
						uni.getUserInfo({
							provider: this.item.provider,
							success: (infoRes) => {
								let data = this.User.__formatOtherLogin(this.item.provider, Object.assign(infoRes, res));
								this.bindEvent(data);
							}
						});
					},
					fail: (err) => {
						uni.showToast({ title: '绑定失败',icon:"none" });
						console.log('login fail:', err);
					}
				});
			},
			async bindEvent(data){
				uni.showLoading({ title: '绑定中...', mask: false });
				let [err,res] = await this.$http.post("/user/bindOther",data,{
					token:true,
					checkToken:true
				})
				if (!this.$http.errorCheck(err,res)) return uni.hideLoading();
				// 绑定成功
				uni.hideLoading();
				uni.showToast({ title: '绑定成功！' });
				// 修改状态，缓存
				this.User.userbind.push({
					"type": data.provider,
					"nickname": data.nickName
				});
				uni.setStorageSync("userbind", this.User.userbind);
				this.$emit('updateuserbind');
			}
		}
	}
</script>

<style scoped>
	.select-hover{
		background: #F4F4F4;
	}
	
	.select{
		padding: 20rpx 25rpx;
		border-bottom: 1rpx solid #EEEEEE;
		/* margin-bottom: 20rpx; */
	}
	.select .left>view:first-of-type{
		padding-right: 10rpx;
	}
	.select .right{
		color: #CCCCCC;
	}
</style>
