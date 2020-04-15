<template>
	<view>
		<detail-list :item="item" @changeevent="updateData"></detail-list>

		<view class="commit-title">最新评论 {{item.commentnum}}</view>

		<block v-for="(reply,index) in replys" :key="index">
			<user-reply :reply="reply"></user-reply>
		</block>
		<!-- 评论输入 -->
		<view style="height: 120rpx;"></view>
		<chat-input @submit="submitMsg"></chat-input>
		<!-- 分享模块 -->
		<detail-share v-if="showShare" @isShowShare="togle" :sharedata="sharedata"></detail-share>
	</view>
</template>

<script>
	import chatInput from '../../components/user-chat/chat-input.vue';
	import detailList from '../../components/detail/detail-list.vue';
	import userReply from '../../components/detail/reply.vue';
	import detailShare from '../../components/detail/detail-share.vue';
	import time from '../../common/time.js';
	export default {
		components: {
			detailList,
			userReply,
			chatInput,
			detailShare
		},
		data() {
			return {
				showShare:false,
				sharedata:{
					title: "",
					shareText: '',
					href: "",
					image: '',
					shareType: 1,
				},
				item: {
					userHead: '',
					userName: '',
					userage: 0,
					usersex: 0,
					isFocus: false,
					content: '',
					contentPicList: [],
					video: false,
					share: false,
					address: '',
					sharenum: 0,
					commentnum: 0,
					likeNum: 0,
					isLike:0
				},
				replys: []
			}
		},
		onLoad(e) {
			let data = JSON.parse(e.detailData);
			this.initData(data);
		},
		methods: {
			initShare(obj){
				this.sharedata = {
					title: obj.title,
					shareText: obj.content,
					href: 'www.baidu.com',
					image: obj.titlepic,
					shareType: 1
				}
			},
			initData(obj) {
				uni.setNavigationBarTitle({title: obj.title});
				uni.showLoading({title: '加载中 ···',mask: true});
				obj.likeNum = obj.like.likeNum;
				obj.userage = obj.userInfo.age;
				obj.usersex = obj.userInfo.sex;
				this.item = obj;
				this.getdetail();
				if(this.item.commentnum){
					this.getcommit();
				}
			},
			async getdetail(){
				let [err,res] =await this.$http.get('/post/'+this.item.id);
				if (!this.$http.errorCheck(err,res)) return uni.hideLoading();
				
				let data = res.data.data.detail;
				this.item.content = data.content;
				this.item.contentPicList = data.images;
				this.item.create_time = data.create_time;
				this.initShare(data);
				return uni.hideLoading();
			},
			async getcommit() {
				let [err,res] =await this.$http.get('/post/'+this.item.id+'/comment');
				if(!this.$http.errorCheck(err,res)) return;
				let data = res.data.data.list;
				var temp = [];
				for (let i in data) {
					let item = data[i];
					if(item.fid == 0){
						let childreply = [];
						for (let j in data) {
							if(data[j].fid == item.id){
								childreply.push({
									userid : data[j].id,
									username: data[j].user.username,
									userpic: data[j].user.userpic,
									commit: data[j].data,
									time: data[j].create_time
								});
							}
						}
						temp.push({
							userid : item.id,
							username: item.user.username,
							userpic: item.user.userpic,
							commit: item.data,
							time: item.create_time,
							childreply: childreply
						});
					}
				}
				this.replys = temp;
			},
			submitMsg(msg) {
				let data = {
					username: "小jiujiu",
					userpic: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					commit: msg,
					time: ""
				}
				data.time = time.gettime.gettime(new Date().getTime());
				this.reply.push(data);
			},
			togle(){
				this.showShare = !this.showShare;
			},
			updateData(data){
				console.log(data);
				switch (data.type){
					case "focus":
						this.updateFocus(data);
						break;
					case "support":
						this.updateSupport(data);
						break;
				}
			},
			updateFocus(data){
				this.item.isFocus = data.data;
			},
			updateSupport(data){
				if(data.do == 'like'){
					this.item.likeNum++;
				}
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				this.togle();
			}
		}
	}
</script>

<style scoped>
	.commit-title{
		font-size: 32rpx;
		font-weight: bold;
		margin: 20rpx 30rpx;
	}
</style>
