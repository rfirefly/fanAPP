<template>
	<view>
		<scroll-view id="scrollView" scroll-y :scroll-top="scrollTop" :style="{height:scrollHeight+'px'}"
		 scroll-with-animation="true">
			<block v-for="(item,index) in userMsg" :key="index">
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
				userMsg: [],
				scrollTop: 0,
				scrollHeight: 0,
			}
		},
		onReady() {
			this.getData();
			this.initData();
			this.pageBottom();
		},
		onShow() {
		},
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				this.openUserSpace();
			}
		},
		methods: {
			openUserSpace() {
				uni.navigateTo({
					url: "../../pages/user-space/user-space"
				})
			},
			initData() {
				try {
					const res = uni.getSystemInfoSync();
					this.scrollHeight=res.windowHeight - uni.upx2px(120);
				} catch (e) { }
			},
			pageBottom() {
				let q = uni.createSelectorQuery().in(this).selectAll(".user-chat-item");
				let itemsHeight = 0;
				this.$nextTick(()=>{
					q.fields({size:true}, data=>{
						data.forEach((item) => {
							itemsHeight += item.height;
						});
						this.scrollTop = itemsHeight > this.scrollHeight ? itemsHeight : 0;
						}).exec();
				});
				
				
			},
			getData() {
				// 模拟获取数据
				let data = [{
						isSendByMe: true,
						userPic: "../../static/demo/userpic/4.jpg",
						type: "image",
						data: "../../static/demo/banner1.jpg",
						time: "1555146412"
					},
					{
						isSendByMe: false,
						userPic: "../../static/demo/userpic/2.jpg",
						type: "image",
						data: "../../static/demo/banner3.jpg",
						time: "1555146812"
					},
					{
						isSendByMe: true,
						userPic: "../../static/demo/userpic/1.jpg",
						type: "image",
						data: "../../static/demo/banner1.jpg",
						time: "1555146412"
					},
					{
							isSendByMe: true,
							userPic: "../../static/demo/userpic/4.jpg",
							type: "image",
							data: "../../static/demo/banner1.jpg",
							time: "1555146412"
						},
						{
							isSendByMe: false,
							userPic: "../../static/demo/userpic/2.jpg",
							type: "image",
							data: "../../static/demo/banner3.jpg",
							time: "1555146812"
						},
						{
							isSendByMe: true,
							userPic: "../../static/demo/userpic/1.jpg",
							type: "image",
							data: "../../static/demo/banner1.jpg",
							time: "1555146412"
						},
					{
						isSendByMe: true,
						userPic: "../../static/demo/userpic/4.jpg",
						type: "image",
						data: "../../static/demo/banner1.jpg",
						time: "1555146412"
					}
				];
				// 数据处理
				for (let i = 0; i < data.length; i++) {
					data[i].gsTime = time.gettime.getChatTime(data[i].time, i > 0 ? data[i - 1].time : 0)
				}
				this.userMsg = data;
			},
			submitMsg(msg) {
				let now = new Date().getTime();
				let gs = time.gettime.getChatTime(now, this.userMsg[this.userMsg.length - 1].time);
				let obj = {
					isSendByMe: true,
					userPic: "../../static/demo/userpic/4.jpg",
					type: "text",
					data: msg,
					time: now,
					gsTime: gs
				};
				if (msg) {
					this.userMsg.push(obj);
					this.pageBottom();
				}
			}
		}
	}
</script>

<style>
	.scrollView{
		margin-bottom: 120rpx;
	}
</style>
