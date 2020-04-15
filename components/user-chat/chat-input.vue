<template>
	<view>
		<view class="chat-input f-ac animated fadeInUp">
			<input type="text" placeholder="文明发言" v-model="msg"/>
			<view class="icon iconfont icon-fabu f-ac-jc" @tap="submit"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: ""
			}
		},
		methods: {
			submit(){
				this.$emit("submit",this.msg);
				this.msg = "";
			}
		}
	}
</script>

<style scoped>
	.chat-input{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1rpx solid #EEEEEE;
		padding: 16rpx 25rpx;
		background: #FFFFFF;
		z-index: 9;
	}
	.chat-input>input{
		flex: 1;
		margin-right: 20rpx;
		padding: 10rpx 20rpx;
		background: #F7F7F7;
		border-radius: 10rpx;
	}
	.chat-input>view{
		font-size: 50rpx;
		width: 80rpx;
	}
</style>
