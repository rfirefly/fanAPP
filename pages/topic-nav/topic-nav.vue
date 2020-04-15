<template>
	<view>
		<!-- 标签条 -->
		<tab-bar :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></tab-bar>

		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in topicList" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadMore(index)">
						<template v-if="items.list.length > 0">
							<!-- 内容列表 -->
								<block v-for="(item,index1) in items.list" :key="index1">
									<news-list :item="item" :index="index1"></news-list>
								</block>								
							<!-- 下拉 -->
							<load-more :loadState="items.loadState"></load-more>
						</template>
						<template v-else-if="items.firstload">
							<view class="f-ac-jc" style="font-size: 50rpx;color: #CCCCCC;padding-top: 100rpx;">loading ~~~</view>
						</template>
						<template v-else>
							<!-- 空白页 -->
							<nothing></nothing>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>


<script>
	import newsList from '../../components/news/news-list.vue';
	import tabBar from "../../components/index/tab-bar.vue";
	import loadMore from '../../components/common/load-more.vue';
	import nothing from '../../components/common/nothing.vue';
	export default {
		components: {
			newsList,
			tabBar,
			loadMore,
			nothing
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 0,
				loadText: '',
				tabBars: [],
				topicList: [{
						loadState: 0, // 0:more, 1: noMore
						list: [{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							}
						]
					},
					{
						loadState: 1, // 0:more, 1: noMore
						list: [{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							}
						]
					},
					{
						loadState: 1, // 0:more, 1: noMore
						list: [{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							},
							{
								src: "../../static/demo/topicpic/3.jpeg",
								title: "this is a title",
								content: "this is content, more more",
								trendNum: 561,
								todayNum: 2584
							}
						]
					},
					{
						loadState: 1,
						list: []
					},
					{
						loadState: 1,
						list: []
					},
					{
						loadState: 1,
						list: []
					},
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.screenHeight - uni.upx2px(100);
					this.swiperheight = height;
				}
			});
			this.getNav();
		},
		methods: {
			async getNav(){
				let [err, res] = await this.$http.get('/TopicClass');
				if(!this.$http.errorCheck(err, res)) return;
				let list = res.data.data.list;
				let arr = [];
				let arr1 = [];
				for (let i in list) {
					arr.push({
						name: list[i].TopicClass,
						id: list[i].id
					});
					arr1.push({
						loadtext:1,
						list:[],
						page:1,
						firstload:true
					});
				}
				this.tabBars = arr;
				this.topicList = arr1;
				this.tabBars.length > 0 && this.getList();
			},
			async getList(){
				let url = `/TopicClass/${this.tabBars[this.tabIndex].id}/topic/${this.topicList[this.tabIndex].page}`;
				let [err,res] = await this.$http.get(url);
				if(!this.$http.errorCheck(err, res, ()=>{this.topicList[this.tabIndex].loadState=0;}, ()=>{this.topicList[this.tabIndex].loadState=0;})) return;
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
				this.topicList[this.tabIndex].list = this.topicList[this.tabIndex].page > 1 ? this.topicList[this.tabIndex].list.concat(arr) : arr;
				this.topicList[this.tabIndex].firstload = false;
				if (list.length < 10) {
					this.topicList[this.tabIndex].loadState=1;
				}else{
					this.topicList[this.tabIndex].loadState=0;
				}
				return;
			},
			loadMore(index) {
				if (this.topicList[index].loadState != 0) {
					return;
				}
				this.topicList[index].loadState = 2;
				this.topicList[this.tabIndex].page++;
				this.getList();
			},
			// tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			// 滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
				this.getList();
			}
		}
	}
</script>

<style>
</style>
