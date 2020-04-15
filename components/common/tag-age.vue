<template>
	<view class="icon iconfont userinfo-age"
	:class="[sex==0?'icon-nan':'icon-nv', {'icon-border': border}]">
		{{age}}
	</view>
</template>

<script>
	export default {
		props:{
			age:Number,
			sex:Number,
			border:{
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.userinfo-age {
		display: inline-block;
		border-radius: 20rpx;
		font-size: 13rpx;
		line-height: 1;
		color: #FFFFFF;
		padding: 4rpx 6rpx 3rpx 5rpx;
		background-color: #007AFF;
	}
	.icon-nv{
		background: #FF698D;
	}
	.icon-border{
		border: 1rpx solid #FFFFFF;
	}
</style>
