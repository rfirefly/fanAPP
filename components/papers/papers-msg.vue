<template>
		<view class="msg f-ac" @tap="openChat">
			<view class="pic">
				<image :src="item.userPic" mode="widthFix" lazy-load></image>
			</view>
			<view class="info">
				<view class="info-name">{{item.userName}}</view>
				<view class="info-msg">{{item.msg}}</view>
			</view>
			<view class="tip">
				<view class="tip-time">{{item.date}}</view>
				<view class="f-jc">
					<uni-badge :text="item.tipNum" type="error" />
				</view>
			</view>
		</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	export default {
		components: {
			uniBadge
		},
		props: {
			item: Object
		},
		methods: {
			openChat(){
				uni.navigateTo({
					url:"../../pages/user-chat/user-chat"
				})
			}
			// openUserSpace() {
			// 	uni.navigateTo({
			// 		url: "../../pages/user-space/user-space"
			// 	})
			// }
		}
	}
</script>

<style scoped>
	.msg {
		margin: 0 25rpx;
		padding: 25rpx 0;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.msg .pic {
		margin-right: 20rpx;
	}

	.msg .pic>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		vertical-align: top;
		flex-shrink: 0;
	}

	.msg .info {
		flex: 1;
		width: 450rpx;
	}

	.msg .info .info-name {
		font-size: 35rpx;
	}

	.msg .info .info-msg {
		font-size: 24rpx;
		color: #999999;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.msg .tip {
		margin-left: 30rpx;
	}

	.msg .tip .tip-time {
		color: #cbcbcb;
	}
</style>
