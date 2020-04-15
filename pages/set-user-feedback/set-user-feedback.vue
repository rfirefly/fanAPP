<template>
	<view>
		<scroll-view id="scrollView" scroll-y :scroll-top="scrollTop" :style="{height:scrollHeight+'px'}"
		 scroll-with-animation="true">
			<view class="f-ac-jc chat-load-more" hover-class="chat-load-more-hover" @tap="loadmore">
				{{loadtext}}
			</view>
			<block v-for="(item,index) in list" :key="index">
				<chat-list class="user-chat-item" :item="item" :index="index"></chat-list>
			</block>
		</scroll-view>
		<chat-input @submit="submitMsg"></chat-input>
	</view>
</template>

<script>
	import chatInput from '../../components/user-chat/chat-input.vue';
	import time from '../../common/time.js';
	import chatList from '../../components/user-chat/chat-list.vue';
	export default {
		components: {
			chatInput,
			chatList
		},
		data() {
			return {
				list: [],
				scrollTop: 0,
				scrollHeight: 0,
				page:1,
				loadtext:"点击加载更多"
			}
		},
		onReady() {
			this.initData();
			this.getData();
		},
		methods: {
			initData() {
				try {
					const res = uni.getSystemInfoSync();
					this.scrollHeight = res.windowHeight - uni.upx2px(120);
				} catch (e) {}
			},
			// 加载更多
			loadmore(){
				if(this.loadtext!="点击加载更多") return;
				// 修改状态
				this.loadtext="加载中...";
				this.page++;
				this.getData();
			},
			pageBottom() {
				let q = uni.createSelectorQuery().selectAll(".user-chat-item");
				let itemsHeight = 0;
				this.$nextTick(() => {
					q.fields({
						size: true
					}, data => {
						data.forEach((item) => {
							itemsHeight += item.height;
						});
						this.scrollTop = itemsHeight > this.scrollHeight ? itemsHeight : 0;
					}).exec();
				});
			},
			async getData() {
				let url = `/getFeedback/${this.page}`;
				let [err,res] = await this.$http.get(url,{},{
					token:true,
					checkToken:true
				});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) return;
				// 数据处理
				let list = res.data.data.list;
				let arr = [];
				for (let i in list) {
					let isme = list[i].from_id == this.User.userinfo.id;
					arr.push({
						isSendByMe: isme,
						userPic: isme ? this.User.userinfo.userpic :"../../static/demo/userpic/11.jpg",
						type:"text",
						data:list[i].data,
						time:list[i].create_time,
						gsTime:list[i].create_time
					});
				}
				
				this.loadtext = list.length < 10 ? "没有更多数据了" :"点击加载更多";
				this.list = [...this.list, ...arr];
				if (this.page === 1 && this.list.length>0) {
					this.pageBottom();
				}
			},
			async submitMsg(data) {
				let [err,res] = await this.$http.post('/feedback',{
					data:data
				},{
					token:true,
					checkToken:true
				});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) return;
				// 成功处理
				// 构建数据
				let now=new Date().getTime();
				let gstime = time.gettime.getChatTime(now,this.list.length>0 ? this.list[this.list.length-1].time : 0);
				this.list.push({
					isSendByMe:true,
					userPic:this.User.userinfo.userpic,
					type:"text",
					data:data,
					time:now,
					gsTime:gstime
				});
				this.pageBottom();
				uni.showToast({ title: '反馈成功' });
			}
		}
	}
</script>

<style>
	.scrollView {
		margin-bottom: 120rpx;
	}
	
	.chat-load-more{
		padding: 15upx 0;
		color: #BBBBBB;
	}
	.chat-load-more-hover{
		background: #F4F4F4;
	}
</style>
