<template>
	<view>
		<view class="t-bg">
			<image :src="item.src" mode="widthFix" lazy-load></image>
		</view>
		<view class="t-info">
			<view class="t-info-title f-ac">
				<image :src="item.src" mode="widthFix" lazy-load></image>
				<view class="title">
					#{{item.title}}#
				</view>
			</view>
			<view class="t-info-data f-ac">
				<view>动态 {{item.trendNum}}</view>
				<view>今日 {{item.todayNum}}</view>
			</view>
			<view class="t-info-content">
				{{item.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item: Object
		}
	}
</script>

<style scoped>
	.t-bg{
		width: 100%;
		height: 300rpx;
		position: relative;
		overflow: hidden;
	}
	.t-bg image{
		width: 100%;
		position: absolute;
		filter: blur(10rpx);
	}
	
	.t-info{
		padding: 0 25rpx;
	}
	
	.t-info .t-info-title{
		position: relative;
	}
	
	.t-info .t-info-title>image{
		width: 150rpx;
		height: 150rpx;
		position: absolute;
		top: -75rpx;
		border-radius: 20rpx;
	}
	.t-info .t-info-title .title{
		font-size: 40rpx;
		margin-left: 180rpx;
		flex: 1;
	}
	
	.t-info .t-info-data{
		margin: 30rpx 0rpx 10rpx 0rpx;
	}
	.t-info .t-info-data>view{
		margin-right: 30rpx;
		color: #cdcdcd;
	}
	.t-info .t-info-content{
		font-size: 36rpx;
		margin-bottom: 10rpx;
		color: #a3a3a3;
	}
</style>
