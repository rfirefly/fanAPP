<template>
	<view>
		<view>
			<view v-if="item.gsTime" class="time f-ac-jc">{{item.gsTime}}</view>
			<view class="chat-list f" :class="{'chat-list-me':item.isSendByMe}">
				<image :src="item.userPic" mode="scaleToFill" lazy-load></image>
				<view>
					<text v-if="item.type=='text'">{{item.data}}</text>
					<image v-else-if="item.type=='image'" :src="item.data" mode="widthFix" lazy-load></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style scoped>
	.chat-list{
		margin: 25rpx;
	}
	.chat-list>image{
		width: 90rpx;
		height: 90rpx;
		border-radius: 100%;
		flex-shrink: 0;
	}
	.chat-list>view{
		background: #F4F4F4;
		word-break: break-all;
		padding: 25rpx;
		border-radius: 20rpx;
		margin-right: 100rpx;
		margin-left: 30rpx;
		position: relative;
	}
	.chat-list>view>image{
		max-width: 300rpx;
		max-height: 600rpx;
	}
	.chat-list>view:before{
		content: '';
		width: 0;
		height: 0;
		border: 15rpx solid;
		position: absolute;
		left: -30rpx;
		right: auto;
		top: 35rpx;
		border-color: transparent #F4F4F4 transparent transparent; 
	}
	
	.chat-list-me {
		justify-content: flex-end;
	}
	.chat-list-me>image{
		
	}
	.chat-list-me>view{
		margin-left: 100rpx;
		margin-right: 30rpx;
		order: -1;
	}
	.chat-list-me>view:before{
		left: auto;
		right: -30rpx;
		top: 35rpx;
		border-color: transparent transparent transparent #F4F4F4;
	}
	.time{
		font-size: 24rpx;
		color: #a2a2a2;
	}
</style>
