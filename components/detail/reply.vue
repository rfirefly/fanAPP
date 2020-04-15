<template>
	<view class="uni-padding-wrap">
		<!-- 评论区 start -->
		<view class="uni-comment-list">
			<view class="uni-comment-face">
				<image :src="reply.userpic" mode="widthFix"></image>
			</view>
			<view class="uni-comment-body">
				<view class="uni-comment-top">
					<text>{{reply.username}}</text>
				</view>
				<view class="uni-comment-content">{{reply.commit}}</view>
				<view class="uni-comment-date">
					<view>{{reply.time}}</view>
				</view>
				<!-- 子评论 -->
				<block v-for="(childItem,index) in reply.childreply" :key="index">
					<view class="uni-comment-list list-inside">
						<view class="uni-comment-face face-inside">
							<image :src="childItem.userpic" mode="widthFix"></image>
						</view>
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text>{{childItem.username}}</text>
							</view>
							<view class="uni-comment-content">{{childItem.commit}}</view>
							<view class="uni-comment-date">
								<view>{{childItem.time}}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			reply:Object
		}
	}
</script>

<style scoped>
	/* comment */
	   .uni-padding-wrap {
	       padding: 6upx 30rpx;
	   }
	
	   view {
	       font-size: 28upx;
	   }
	
	   .uni-comment {
	       padding: 5rpx 0;
	       display: flex;
	       flex-grow: 1;
	       flex-direction: column;
	   }
	
	   .uni-comment-list {
	       flex-wrap: nowrap;
	       padding: 10rpx 0;
	       margin: 10rpx 0;
	       width: 100%;
	       display: flex;
	   }
	
	   .uni-comment-face {
	       width: 70upx;
	       height: 70upx;
	       border-radius: 100%;
	       margin-right: 20upx;
	       flex-shrink: 0;
	       overflow: hidden;
	   }
	
	   .uni-comment-face image {
	       width: 100%;
	       border-radius: 100%;
	   }
	
	   .uni-comment-body {
	       width: 100%;
	   }
	
	   .uni-comment-top {
	       line-height: 1.5em;
	       justify-content: space-between;
	   }
	
	   .uni-comment-top text {
	       color: #0A98D5;
	       font-size: 24upx;
	   }
	
	   .uni-comment-date {
	       line-height: 38upx;
	       flex-direction: row;
	       justify-content: space-between;
	       display: flex !important;
	       flex-grow: 1;
	   }
	
	   .uni-comment-date view {
	       color: #666666;
	       font-size: 24upx;
	       line-height: 38upx;
	   }
	
	   .uni-comment-content {
	       line-height: 1.6em;
	       font-size: 28upx;
	       padding: 8rpx 0;
	   }
	
	   .uni-comment-replay-btn {
	       background: #FFF;
	       font-size: 24upx;
	       line-height: 28upx;
	       padding: 5rpx 20upx;
	       border-radius: 30upx;
	       color: #333 !important;
	       margin: 0 10upx;
	   }
		
		.list-inside{
			background: #F4F4F4;
			margin: 0;
			box-sizing: border-box;
		}
		
		.face-inside{
			margin-left: 15rpx;
		}
</style>
