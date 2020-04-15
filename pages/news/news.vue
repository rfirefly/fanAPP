<template>
	<view>
		<news-nav-bar :navList="navList" :navIndex="navIndex" @changeIndex="change"></news-nav-bar>

		<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="navIndex" @change="tabChange">
			<swiper-item>
				<scroll-view :style="{height:swiperheight+'px'}" scroll-y class="list" @scrolltolower="loadMore">
					<block v-for="(item,index) in focus.list" :key="index">
						<common-list :item="item" :index="index" @changeIsFocus="updateData"></common-list>
					</block>
					<load-more :loadState="focus.loadState"></load-more>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view :style="{height:swiperheight+'px'}" scroll-y class="list">
					<!-- 搜索框 -->
					<view class="search">
						<input class="uni-input" placeholder="搜索话题" placeholder-class="search-placeholder icon iconfont icon-sousuo" disabled @tap="openSearch"/>
					</view>
					<!-- 轮播图 -->
					<news-banner :bannerPic="topic.banner"></news-banner>
					<!-- 热点 -->
					<news-topic-nav :topicTitle="topic.topicTitle"></news-topic-nav>
					<!-- 内容 -->
					<view class="n-content">
						<view class="renew">最近更新</view>
						<block v-for="(item,index) in topic.newsList" :key="index">
							<news-list :item="item" :index="index"></news-list>
						</block>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import commonList from '../../components/common/common-list.vue';
	import newsNavBar from '../../components/news/news-nav-bar.vue';
	import loadMore from '../../components/common/load-more.vue';
	import newsBanner from '../../components/news/banner.vue';
	import newsTopicNav from '../../components/news/news-topic-nav.vue'
	import newsList from '../../components/news/news-list.vue';
	export default {
		components: {
			commonList,
			newsNavBar,
			loadMore,
			newsBanner,
			newsTopicNav,
			newsList
		},
		data() {
			return {
				swiperheight: 500,
				navIndex: 0,
				navList: [{
						name: '关注',
						id: 'focus'
					},
					{
						name: '话题',
						id: 'topic'
					}
				],
				focus: {
					loadState: 0,
					// 文字类型
					list: [{
							userpic: "../../static/demo/userpic/5.jpg",
							username: 'sgdds',
							userage: 18,
							usersex: 1,
							isFocus: false,
							title: 'this is a content',
							titlepic: '',
							video: false,
							share: false,
							path: '北京 北京',
							sharenum: 99,
							commentnum: 954,
							like:{
								likeNum: 56
							}
						},
						// 图片类型
						{
							userpic: "../../static/demo/userpic/6.jpg",
							username: 'hsg54545fds',
							userage: 18,
							usersex: 0,
							isFocus: false,
							title: 'this is a content',
							titlepic: '../../static/demo/banner1.jpg',
							video: false,
							share: false,
							path: '北京 北京',
							sharenum: 99,
							commentNum: 954,
							like:{
								likeNum: 56
							}
						},
						// 视频类型
						{
							userpic: "../../static/demo/userpic/7.jpg",
							username: 'gf和广泛的',
							userage: 18,
							usersex: 0,
							isFocus: false,
							title: 'this is a content',
							titlepic: '',
							video: {
								src: '../../static/demo/datapic/14.jpg',
								time: '5:09',
								playNum: 14515
							},
							share: false,
							path: '北京 北京',
							sharenum: 99,
							commentNum: 954,
							like:{
								likeNum: 56
							}
						},
						// 分享类型
						{
							userpic: '../../static/demo/userpic/8.jpg',
							username: 'gf和afdas',
							userage: 18,
							usersex: 1,
							isFocus: false,
							title: 'this is a content',
							titlepic: '',
							video: false,
							share: {
								src: '../../static/demo/datapic/16.jpg',
								title: 'this is a commit'
							},
							path: '北京 北京',
							sharenum: 99,
							commentNum: 954,
							like:{
								likeNum: 56
							}
						}
					]
				},
				topic: {
					banner: [],
					topicTitle: [],
					newsList: []
				}
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			});
			this.__init();
		},
		methods: {
			__init(){
				this.getBanner();
				this.getTopicClass();
				this.getTopic();
			},
			async getBanner(){
				let url = '/adsense/0';
				let [err, res] = await this.$http.get(url);
				if (!this.$http.errorCheck(err, res)) return;
				
				let arr = [];
				let list = res.data.data.list;
				for (let i in list) {
					arr.push({
						src: list[i].src,
						url: list[i].url
					});
				}
				this.topic.banner = arr;
			},
			async getTopicClass(){
				// 获取api数据
				let [err, res] = await this.$http.get('/TopicClass');
				if (!this.$http.errorCheck(err, res)) return;
				// 数据处理
				let arr = [];
				let list = res.data.data.list;
				for (let i in list) {
					arr.push({
						id: list[i].id,
						name: list[i].TopicClass
					});
				}
				this.topic.topicTitle = arr;
			},
			async getTopic(){
				// 获取api数据
				let [err, res] = await this.$http.get('/HotTopic');
				if (!this.$http.errorCheck(err, res)) return;
				// 数据处理
				let arr = [];
				let list = res.data.data.list;
				for (let i in list) {
					arr.push({
						id: list[i].id,
						src: list[i].titlepic,
						title: list[i].title,
						content: list[i].desc,
						trendNum: list[i].post_count,
						todayNum: list[i].todaypost_count
					});
				}
				this.topic.newsList = arr;
			},
			change(index) {
				this.navIndex = index;
			},
			// 滑动事件
			tabChange(e) {
				this.navIndex = e.detail.current;
			},
			openSearch(){
				uni.navigateTo({
					url: '../search/search?searchType=topic'
				});
			},
			loadMore() {
				if (this.focus.loadState != 0) {
					return;
				}
				this.focus.loadState = 2; // 0:more, 1: noMore, 2:loading
				setTimeout(() => {
					let listData = {
						userHead: "../../static/demo/userpic/6.jpg",
						username: 'hsg54545fds',
						userage: 18,
						usersex: 0,
						isFocus: false,
						title: 'this is a content',
						titlepic: '../../static/demo/banner1.jpg',
						video: false,
						share: false,
						path: '北京 北京',
						sharenum: 99,
						commentNum: 954,
						like:{
							likeNum: 56
						}
					};
					this.focus.list.push(listData);
					this.focus.loadState = 0;
				}, 300);
			},
			updateData(data){
				switch (data.type){
					case "focus":
					this.updateFocus(data);
						break;
					case "support":
					this.updateSupport(data);
						break;
					case "updateList":
					this.updateList(data);
						break;
					case 'updateComment':
					this.updateComment(data);
						break;
				}
			},
			updateFocus(data){
				console.log("here");
				this.topic.newsList[this.navIndex].list.forEach((item,index)=>{
					if (item.userid === data.userid) {
						item.isFocus = data.data;
					}
				})
			}
		}
	}
</script>

<style>
	.search {
		margin: 25rpx;
	}

	.search>input {
		background: #F4F4F4;
		border-radius: 10rpx;
	}

	.search .search-placeholder {
		text-align: center;
		font-size: 30rpx;
	}

	.search .search-placeholder::before {
		letter-spacing: 10rpx;
	}

	.n-content {
		padding: 25rpx;
	}

	.n-content .renew {
		font-size: 32rpx;
		margin-bottom: 10rpx;
	}
</style>
