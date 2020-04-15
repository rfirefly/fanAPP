<template>
	<view class="home-data f-ac-jc">
		<view v-for="(item,index) in homeData" :key="index">
			<view>
				<view>{{item.num}}</view>
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			homeData:Array
		}
	}
</script>

<style>
	.home-data {
		padding: 20rpx 40rpx;
	}
	
	.home-data>view {
		flex: 1;
		text-align: center;
		color: #989898;
	}
	
	.home-data>view view:first-of-type {
		color: #000000;
		font-size: 32rpx;
	}
</style>
