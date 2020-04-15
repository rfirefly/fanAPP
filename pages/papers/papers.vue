<template>
	<view>
		<papers-popup :show="show" @hidden="closeMenu" @add="addFriend" @clear="clearCache"></papers-popup>
		<block v-for="(item,index) in msgList" :key="index">
			<papers-msg :item="item"></papers-msg>
		</block>
		<load-more :loadState="loadState"></load-more>
	</view>
</template>

<script>
	import papersPopup from '@/components/papers/papers-popup.vue';
	import papersMsg from '@/components/papers/papers-msg.vue';
	import loadMore from '../../components/common/load-more.vue';
	export default {
		components: {
			papersMsg,
			loadMore,
			papersPopup
		},
		data() {
			return {
				show: false,
				loadState: 0,
				msgList: [
					{
						userPic: "../../static/demo/userpic/1.jpg",
						userName: "用户名",
						msg: "广大韩国i都i给大家哦i给的gfdsgfg价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/1.jpg",
						userName: "用户gh名",
						msg: "广大韩国i都i给大dhf家哦i给的gfdsgfg价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/4.jpg",
						userName: "用户名",
						msg: "广大韩国i都g价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/3.jpg",
						userName: "用户名",
						msg: "fg价格i哦就",
						date: "02:35",
						tipNum: "154"
					},
					{
						userPic: "../../static/demo/userpic/2.jpg",
						userName: "用户jiihidrhdh名",
						msg: "广fg价格i哦就",
						date: "02:35",
						tipNum: "1425"
					},
					{
						userPic: "../../static/demo/userpic/1.jpg",
						userName: "用户名",
						msg: "广大韩国i都i给大家哦i给的gfdsgfg价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/1.jpg",
						userName: "用户gh名",
						msg: "广大韩国i都i给大dhf家哦i给的gfdsgfg价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/4.jpg",
						userName: "用户名",
						msg: "广大韩国i都g价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/3.jpg",
						userName: "用户名",
						msg: "fg价格i哦就",
						date: "02:35",
						tipNum: "154"
					},
					{
						userPic: "../../static/demo/userpic/2.jpg",
						userName: "用户jiihidrhdh名",
						msg: "广fg价格i哦就",
						date: "02:35",
						tipNum: "1425"
					}
				]
			}
		},
		onPullDownRefresh() {
			this.refresh();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.loadMore();
		},
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					this.User.navigate({url: "../friend-list/friend-list"});
					this.closeMenu();
					break;
				case 1:
					this.showMenu();
					break;
			}
		},
		methods: {
			refresh() {
				//get servers data
				let list = [{
						userPic: "../../static/demo/userpic/5.jpg",
						userName: "用1",
						msg: "广大韩国i都i给大家哦i给的gfdsgfg价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/5.jpg",
						userName: "用2",
						msg: "广大韩国i都i给大dhf家哦i给的gfdsgfg价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/4.jpg",
						userName: "用3",
						msg: "广大韩国i都g价格i哦就",
						date: "02:35",
						tipNum: "15"
					},
					{
						userPic: "../../static/demo/userpic/3.jpg",
						userName: "用户名",
						msg: "fg价格i哦就",
						date: "02:35",
						tipNum: "154"
					},
					{
						userPic: "../../static/demo/userpic/2.jpg",
						userName: "用户jiihidrhdh名",
						msg: "广fg价格i哦就",
						date: "02:35",
						tipNum: "1425"
					},

				]
				//assignment
				this.msgList = list;
			},
			loadMore(index) {
				if (this.loadState != 0) {
					return;
				}
				this.loadState = 2;
				setTimeout(() => {
					let data = {
						userPic: "../../static/demo/userpic/5.jpg",
						userName: "用1",
						msg: "广大韩国i都i给大家哦i给的gfdsgfg价格i哦就",
						date: "02:35",
						tipNum: "15"
					};
					this.msgList.push(data);
					this.loadState = 0;
				}, 300);
			},
			showMenu() {
				this.show = true;
			},
			closeMenu() {
				this.show = false;
			},
			addFriend() {
				console.log("add Friend");
				this.closeMenu();
			},
			clearCache() {
				console.log("clear");
				this.closeMenu();
			}
		}
	}
</script>

<style>
	.papers-menu-mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}

	.papers-menu {
		position: fixed;
		background: #FFFFFF;
		top: 10rpx;
		right: 0;
		border-radius: 8rpx;
		width: 55%;
		z-index: 999;
		box-sizing: border-box;
		box-shadow: 1rpx 1rpx 20rpx 2rpx #CCCCCC;
	}

	.papers-menu>view {
		padding: 20rpx;
		font-size: 35rpx;
		font-weight: bold;
	}

	.papers-menu .icon {
		margin-right: 20rpx;
	}

	.papers-menu .menu-hover-item {
		background: #EEEEEE;
	}
</style>
