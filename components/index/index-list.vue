<template>
	<view class="index-list animated fadeInLeft">
		<view class="index-list1 f-ac-jsb">
			<view class="user-info f-ac">
				<view class="user-head" @tap="openUserSpace">
					<image :src="item.userHead" mode="aspectFill" lazy-load></image>
				</view>
				<view class="user-name">{{ item.userName }}</view>
			</view>
			<view class="right f-ac">
				<view class="focus icon iconfont icon-zengjia" v-show="!item.isFocus" @tap="focus">关注</view>
				<!-- <view class="close icon iconfont icon-guanbi"></view> -->
			</view>
		</view>
		<view class="index-list2" @tap="openDetail">
			{{ item.comment }}
		</view>
		<view class="index-list3" @tap="openDetail">
			<view class="pic-style" v-if="item.mediaType=='img' && item.media">
				<image :src="item.media" mode="widthFix" lazy-load></image>
			</view>
			<view class="video-style f-ac-jc" v-else-if="item.mediaType=='video'">
				<image :src="item.media" mode="widthFix" lazy-load></image>
				<view class="icon iconfont icon-bofang video-btn"></view>
				<view class="video-info">
					{{ item.playNum }}播放 {{ item.time }}
				</view>
			</view>
		</view>
		<view class="index-list4 f-ac-jsb">
			<view class="left">
				<view class="icon iconfont icon-icon_xiaolian-mian" :class="{'active' : (item.like.isLike == 1)}" @tap="userLike('like')">{{item.like.likeNum}}</view>
				<view class="icon iconfont icon-kulian" :class="{'active' : (item.like.isLike == 2)}" @tap="userLike('dislike')">{{item.like.dislikeNum}}</view>
			</view>
			<view class="right">
				<view class="icon iconfont icon-pinglun1">{{ item.commentNum }}</view>
				<view class="icon iconfont icon-zhuanfa">{{ item.shareNum }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods: {
			// 进入详情页接口
			openDetail(){
				uni.navigateTo({
					url:'../../pages/detail/detail?detailData=' + JSON.stringify(this.item)
				})
			},
			openUserSpace(){
				uni.navigateTo({
					url:"../../pages/user-space/user-space"
				})
			},
			async focus() {
				let [err,res] = await this.$http.post('/follow',{
					follow_id:this.item.userid
				},{
					token:true,
					checkToken:true,
					checkAuth:true
				});
				// 错误处理
				if (!this.$http.errorCheck(err,res)){
					return;
				}
				// 通知首页修改数据
				uni.showToast({ title: '关注成功' });
				let resdata = {
				 	type:"focus",
				 	userid:this.item.userid,
				 	data:true
				};
				// 通知父组件
				this.$emit('changeIsFocus',resdata);
			},
			async userLike(type) {
				// islike: 0, //0:没有操作，1:顶,2:踩；
				let index = (type === 'like') ? 1 : 2; // 操作后的状态
				if(this.item.like.isLike === index) return; // 状态相同不修改
				let [err,res] = await this.$http.post('/support',{
					post_id:this.item.id,
					type:index-1
				},{
					token:true,
					checkToken:true,
					checkAuth:true
				});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) return;

				let resdata = {
					type:"support",
					post_id:this.item.id,
					do:type
				};
				// 通知父组件
				this.$emit('changeevent',resdata);
				// 通知全局
				uni.$emit("updateData",resdata);
				return;
			}
		}
	}
</script>

<style scoped>
	.index-list {
		padding: 20rpx;
		border-bottom: 1upx solid #efefef;
	}

	.index-list1 .user-info .user-name {
		color: #999999;
	}

	.index-list1 .user-info .user-head {
		margin-right: 20rpx;
	}

	.index-list1 .user-info image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.index-list1 .right .focus {
		border-radius: 10rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
		margin-right: 10rpx;
		background-color: #f4f4f4;
	}

	.index-list1 .right .close {
		color: #929292;
	}

	.index-list2,
	.index-list3 {
		margin-top: 15rpx;
		font-size: 32rpx;
	}

	.index-list3 {
		position: relative;
	}

	.index-list3 .pic-style image {
		width: 100%;
		border-radius: 20rpx;
	}

	.index-list3 .video-style {
		color: #FFFFFF;
	}

	.index-list3 .video-style image {
		width: 100%;
		border-radius: 20rpx;
	}

	.index-list3 .video-style .video-btn {
		position: absolute;
		font-size: 100rpx;
	}

	.index-list3 .video-style .video-info {
		position: absolute;
		background: rgba(51, 51, 51, .72);
		right: 8rpx;
		bottom: 8rpx;
		border-radius: 50rpx;
		padding: 0 20rpx;
	}

	.index-list4 {
		padding: 15rpx 0;
		color: #999999;
	}

	.index-list4 .left>view,
	.index-list4 .right>view {
		display: inline-block;
	}

	.index-list4 .left>view:first-child,
	.index-list4 .right>view:first-child {
		margin-right: 15rpx;
	}
	
	.index-list4 .left .icon-kulian,
	.index-list4 .left .icon-icon_xiaolian-mian{
		letter-spacing: 7rpx;
	}

	.index-list4 .left .active {
		color: #c5f61c;
	}
</style>
