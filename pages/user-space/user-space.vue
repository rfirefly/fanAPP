<template>
	<view>
		<user-space-info :userInfo="userInfo"></user-space-info>
		<view class="user-info-data">
			<home-data :homeData="spaceData"></home-data>
		</view>
		<view class="space-fill"></view>
		<tab-bar listBorder="border-bottom:0;" itemWidth="width:33.3%;" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></tab-bar>
		<!-- 内容 -->
		<view class="space-content">
				<template v-if="tabIndex == 0">
					<user-space-homepage :userInfo="userInfo"></user-space-homepage>
				</template>
				<template v-else>
					<block v-for="(items,index) in topicList" :key="index">
						<template v-if="tabIndex == index">
							<block v-for="(item,itemIndex) in items.list" :key="itemIndex">
								<common-list :item="item" :index="itemIndex"></common-list>
							</block>
							<load-more :status="items.loadState" iconType="circle"></load-more>
						</template>
					</block>
				</template>
		</view>
		
		<user-space-popup :show="show" @hidden="togleMenu" @dislike="dislike" @remark="remark"></user-space-popup>
	</view>
</template>

<script>
	import userSpaceInfo from '../../components/user-space/user-space-info.vue';
	import homeData from '../../components/home/home-data.vue';
	import tabBar from "../../components/index/tab-bar.vue";
	import userSpaceHomepage from '../../components/user-space/user-space-homepage.vue';
	import commonList from '../../components/common/common-list.vue';
	import loadMore from '../../components/uni-load-more/uni-load-more.vue';
	import userSpacePopup from '@/components/user-space/user-space-popup.vue';
	export default {
		components: {
			userSpaceInfo,
			homeData,
			tabBar,
			userSpaceHomepage,
			commonList,
			loadMore,
			userSpacePopup
		},
		data() {
			return {
				show:false,
				userInfo: {
					bgImage: "../../static/demo/topicpic/5.jpeg",
					userpic: "../../static/demo/topicpic/5.jpeg",
					username: "玫琳凯",
					sex: 1,
					age: 18,
					isFocus: true,
					regTime: "2019-09-17",
					ID: 2516,
					birthday: "1995-05-05",
					occupation: "IT",
					birthplace: "北京",
					emotion: "未婚"
				},
				spaceData: [{
						name: "获赞",
						num: 0
					},
					{
						name: "关注",
						num: 0
					},
					{
						name: "粉丝",
						num: 0
					},
				],
				tabIndex: 0,
				tabBars: [{
						name: "主页",
						id: "zhuye"
					},
					{
						name: "趣事",
						id: "qushi"
					},
					{
						name: "动态",
						id: "dongtai"
					}
				],
				topicList: [
					{},
					{
						loadState: 0, // 0:more, 1: noMore
						list: [{
								userpic: "../../static/demo/userpic/5.jpg",
								username: 'sgdds',
								userage: 18,
								usersex: 1,
								isFocus: false,
								content: 'this is a content',
								contentPic: '',
								video: false,
								share: false,
								address: '北京 北京',
								shareNum: 99,
								commitNum: 954,
								likeNum: 56
							},
							// 图片类型
							{
								userpic: "../../static/demo/userpic/6.jpg",
								username: 'hsg54545fds',
								userage: 18,
								usersex: 0,
								isFocus: false,
								content: 'this is a content',
								contentPic: '../../static/demo/banner1.jpg',
								video: false,
								share: false,
								address: '北京 北京',
								shareNum: 99,
								commitNum: 954,
								likeNum: 56
							},
							// 视频类型
							{
								userpic: "../../static/demo/userpic/7.jpg",
								username: 'gf和广泛的',
								userage: 18,
								usersex: 0,
								isFocus: false,
								content: 'this is a content',
								contentPic: '',
								video: {
									src: '../../static/demo/datapic/14.jpg',
									time: '5:09',
									playNum: 14515
								},
								share: false,
								address: '北京 北京',
								shareNum: 99,
								commitNum: 954,
								likeNum: 56
							},
							// 分享类型
							{
								userpic: '../../static/demo/userpic/8.jpg',
								username: 'gf和afdas',
								userage: 18,
								usersex: 1,
								isFocus: false,
								content: 'this is a content',
								contentPic: '',
								video: false,
								share: {
									src: '../../static/demo/datapic/16.jpg',
									title: 'this is a commit'
								},
								address: '北京 北京',
								shareNum: 959,
								commitNum: 54,
								likeNum: 5446
							}
						]
					},
					{
						loadState: 1, // 0:more, 1: noMore
						list: [
							// 图片类型
							{
								userpic: "../../static/demo/userpic/6.jpg",
								username: 'hsg54545fds',
								userage: 18,
								usersex: 0,
								isFocus: false,
								content: 'this is a content',
								contentPic: '../../static/demo/banner1.jpg',
								video: false,
								share: false,
								address: '北京 北京',
								shareNum: 99,
								commitNum: 954,
								likeNum: 56
							},
							// 视频类型
							{
								userpic: "../../static/demo/userpic/7.jpg",
								username: 'gf和广泛的',
								userage: 18,
								usersex: 0,
								isFocus: false,
								content: 'this is a content',
								contentPic: '',
								video: {
									src: '../../static/demo/datapic/14.jpg',
									time: '5:09',
									playNum: 14515
								},
								share: false,
								address: '北京 北京',
								shareNum: 99,
								commitNum: 954,
								likeNum: 56
							},
							// 分享类型
							{
								userpic: '../../static/demo/userpic/8.jpg',
								username: 'gf和afdas',
								userage: 18,
								usersex: 1,
								isFocus: false,
								content: 'this is a content',
								contentPic: '',
								video: false,
								share: {
									src: '../../static/demo/datapic/16.jpg',
									title: 'this is a commit'
								},
								address: '北京 北京',
								shareNum: 959,
								commitNum: 54,
								likeNum: 5446
							}
						]
					}
				]
			}
		},
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0:
					this.togleMenu();
					break;
					
				case 1:
					this.togleMenu();
					break;
			}
		},
		onReachBottom() {
			this.loadMore();
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
			},
			loadMore() {
				if (this.topicList[this.tabIndex].loadState != 0) {
					return;
				}
				this.topicList[this.tabIndex].loadState = 2; // 0:more, 1: noMore, 2:loading
				setTimeout(() => {
					let listData = {
						userpic: "../../static/demo/userpic/6.jpg",
						username: 'hsg54545fds',
						userage: 18,
						usersex: 0,
						isFocus: false,
						content: 'this is a content',
						contentPic: '../../static/demo/banner1.jpg',
						video: false,
						share: false,
						address: '北京 北京',
						shareNum: 99,
						commitNum: 954,
						likeNum: 56
					};
					this.topicList[this.tabIndex].list.push(listData);
					this.topicList[this.tabIndex].loadState = 0;
				}, 300);
			},
			togleMenu(){
				this.show = !this.show;
			},
			dislike(){
				console.log("add Friend");
				this.togleMenu();
			},
			remark(){
				console.log("clear");
				this.togleMenu();
			}
		}
		
	}
</script>

<style>
	.user-info-data {
		position: relative;
		top: -20rpx;
		z-index: 10;
		background: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.space-fill {
		background: #D8D8D8;
		width: 100%;
		height: 30rpx;
	}

	.space-content {
		margin: 0 30rpx;
	}
</style>
