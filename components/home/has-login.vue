<template>
	<view>
		<view class="home-info f-ac">
			<view class="userhead">
				<image :src="homeinfo.userpic" mode=""></image>
			</view>
			<view class="userinfo">
				<view class="user-name">{{homeinfo.username}}</view>
				<view class="user-data">总访客 {{homeinfo.totalnum}}  今日 {{homeinfo.todaynum}}</view>
			</view>
			<view class="icon iconfont icon-jinru"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			homeinfo: Object
		},
	}
</script>

<style scoped>
	.home-info{
		padding: 20rpx;
	}
	
	.home-info .userhead{
		padding-right: 30rpx;
	}
	
	.home-info .userhead>image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		flex-shrink: 0;
	}
	.home-info .userinfo{
		flex: 1;
	}
	.home-info .userinfo .user-name{
		font-size: 32rpx;
		font-weight: bold;
	}
	.home-info .userinfo .user-data{
		color: #BBBBBB;
	}
	
	.home-info .icon{
		flex-shrink: 0;
	}
</style>
