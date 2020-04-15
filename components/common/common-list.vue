<template>
	<view class="common-list f animated fadeInLeft">
		<view class="list-left">
			<view class="head-pic" @tap="openUserSpace">
				<image :src="item.userHead" mode="aspectFill" lazy-load></image>
			</view>
		</view>
		<view class="list-right" @tap="openDetail">
			<view class="f-ac-jsb">
				<view class="f-ac">
					<view class="userinfo-name">{{item.userName}}</view>
					<tag-age :age="item.userage" :sex="item.usersex"></tag-age>
				</view>
				<view class="userinfo-r f-ac">
					<view v-if="!item.isFocus" @tap.stop="focus" class="focus icon iconfont icon-zengjia">关注</view>
				</view>
			</view>
			<view class="r-content">
				{{item.title}}
			</view>
			<view class="r-media">
				<!-- picture -->
				<view v-if="item.titlepic" class="pic-style">
					<image :src="item.titlepic" mode="widthFix" lazy-load></image>
				</view>
				<!-- video -->
				<view v-else-if="item.video" class="video-style f-ac-jc">
					<image :src="item.video.src" mode="widthFix" lazy-load></image>
					<view class="icon iconfont icon-bofang video-btn"></view>
					<view class="video-info">
						{{item.video.playNum}}播放 {{item.video.time}}
					</view>
				</view>
				<!-- share -->
				<view v-else-if="item.share" class="share-style f-ac">
					<image :src="item.share.src" mode="widthFix" lazy-load></image>
					<view>{{item.share.title}}</view>
				</view>
			</view>
			<view class="r-share f-ac-jsb">
				<view>
					{{item.path}}
				</view>
				<view class="r-share-r f-ac">
					<view class="icon iconfont icon-zhuanfa">{{item.sharenum}}</view>
					<view class="icon iconfont icon-pinglun1">{{item.commentnum}}</view>
					<view class="icon iconfont icon-dianzan1">{{item.like.likeNum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagAge from './tag-age.vue';
	export default {
		components: {
			tagAge
		},
		props: {
			item: Object,
			index: Number
		},
		methods: {
			openDetail(){
				uni.navigateTo({
					url:'../../pages/detail/detail?detailData=' + JSON.stringify(this.item)
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
			openUserSpace() {
				uni.navigateTo({
					url: "../../pages/user-space/user-space"
				})
			}
		},
	}
</script>

<style>
	@import url("../../common/common.css");
</style>
