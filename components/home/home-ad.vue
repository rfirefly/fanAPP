<template>
	<view class="home-ad">
		<image :src="adPic" mode="widthFix" lazy-load></image>
	</view>
</template>

<script>
	export default {
		props:{
			adPic:String
		}
	}
</script>

<style>
	
	.home-ad {
		padding: 20rpx;
	}
	
	.home-ad>image {
		width: 100%;
		border-radius: 10rpx 20rpx;
	}
</style>
