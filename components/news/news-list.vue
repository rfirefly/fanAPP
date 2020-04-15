<template>
		<view class="n-list f-ac" @tap="openTopicDetail">
			<view>
				<image :src="item.src" mode="widthFix" lazy-load></image>
			</view>
			<view class="n-text">
				<view class="title">#{{item.title}}#</view>
				<view>{{item.content}}</view>
				<view>动态 {{item.trendNum}} 今日 {{item.todayNum}}</view>
			</view>
		</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods:{
			openTopicDetail(){
				uni.navigateTo({
					url: '../../pages/topic-detail/topic-detail?detail='+JSON.stringify(this.item)
				});
			}
		}
	}
</script>

<style scoped>
	.n-list {
		margin: 0 25rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.n-list image {
		width: 150rpx;
		height: 150rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
		vertical-align: top;
	}

	.n-list .n-text {
		height: 100%;
	}

	.n-list .n-text>view {
		color: #A4A4A4;
		line-height: 1.5;
	}

	.n-list .n-text .title {
		font-size: 36rpx;
		color: #333333;
		line-height: 1;
	}
</style>
