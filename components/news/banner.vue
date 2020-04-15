<template>
	<view class="banner">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block v-for="(item,index) in bannerPic" :key="index">
				<swiper-item>
						<image :src="item.src" mode="widthFix" lazy-load=""></image>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			bannerPic:Array
		}
	}
</script>

<style scoped>
	.banner{
		margin: 0 25rpx 25rpx 25rpx;
	}
	.banner image{
		border-radius: 15rpx;
		width: 100%;
	}
</style>
