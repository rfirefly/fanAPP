<template>
	<view class="common-list f">
		<view class="list-left">
			<view class="head-pic">
				<image :src="item.userHead" mode="widthFix" lazy-load></image>
			</view>
		</view>
		
		<view class="list-right">
			<!-- 用户名 -->
			<view class="f-ac-jsb">
				<view class="f-ac">
					<view class="userinfo-name">{{item.userName}}</view>
					<tag-age :age="item.userage" :sex="item.usersex"></tag-age>
				</view>
				<view class="userinfo-r f-ac">
					<view v-if="!item.isFocus" @tap="focus" class="focus icon iconfont icon-zengjia">关注</view>
				</view>
			</view>
			<!-- 时间 -->
			<view class="date" v-show="item.create_time">{{item.create_time}}</view>
			<!-- 内容 -->
			<view class="r-content">{{item.content}}</view>
			<!-- 媒体 -->
			<view class="r-media">
				<!-- picture -->
				<view v-if="item.contentPicList.length>0" class="pic-style">
					<block v-for="(pic,index) in item.contentPicList" :key="index">
						<image :src="pic.url" mode="widthFix" lazy-load @tap="previewPic(index)"></image>
					</block>
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
					<view class="icon iconfont icon-dianzan1" @tap="userLike('like')">{{item.likeNum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagAge from '../common/tag-age.vue';
	export default {
		components:{
			tagAge
		},
		props:{
			item:Object,
			index:Number
		},
		methods: {
			async focus() {
				let [err,res] = await this.$http.post('/follow',{
					follow_id:this.item.userid
				},{
					token:true,
					checkToken:true,
					checkAuth:true
				});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) return;
				// 通知首页修改数据
				uni.showToast({ title: '关注成功' });
				let resdata = {
				 	type:"focus",
				 	userid:this.item.userid,
				 	data:true
				};
				// 通知父组件
				this.$emit('changeevent',resdata);
				// 全局通知
				uni.$emit('updateData',resdata);
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
			},
			previewPic(index){
				let imgs = [];
				this.item.contentPicList.forEach((item, index)=>{
					imgs.push(item.url);
				})
				uni.previewImage({
					urls:imgs,
					current:index,
					indicator:"default"
				})
			}
		},
	}
</script>

<style scoped>
	@import url("../../common/common.css");
	.common-list{
		border-bottom: 1rpx solid #EEEEEE;
	}
	.list-right{
		border-bottom: 0;
	}
	.list-right .date{
		color: #CCCCCC;
	}
</style>
