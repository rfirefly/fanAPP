<template>
	<view class="topic-nav">
		<view class="top f-ac-jsb">
			<view class="left">热门分类</view>
			<view class="right f-ac" @tap="openTopicNav">
				更多
				<view class="icon iconfont icon-jinru"></view>
			</view>
		</view>
		<view class="content f-ac">
			<block v-for="(item,index) in topicTitle" :key="index">
				<view>{{item.name}}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			topicTitle:Array
		},
		methods:{
			openTopicNav(){
				uni.navigateTo({
					url:'../../pages/topic-nav/topic-nav'
				})
			}
		}
	}
</script>

<style scoped>
	.topic-nav{
		border-top: 1rpx solid #EEEEEE;
		border-bottom: 1rpx solid #EEEEEE;
		padding: 25rpx 30rpx 30rpx 25rpx;
	}
	.topic-nav .top>view{
		margin-bottom: 20rpx;
		font-size: 32rpx;
	}
	.topic-nav .top .right{
		color: #999;
	}
	.topic-nav .content>view{
		flex: 1;
		background-color: #EEEEEE;
		text-align: center;
		font-size: 24rpx;
		padding: 6rpx;
		margin: 0 15rpx;
		border-radius: 15rpx;
		color: #9e9e9e;
	}
</style>
