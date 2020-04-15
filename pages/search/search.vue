<template>
	<view>
		<template v-if="list.length > 0">
			<!-- 内容列表 -->
			<block v-for="(item,index) in list" :key="index">
				<template v-if="searchType === 'post'">
					<index-list :item="item" :index="index"></index-list>
				</template>
				<template v-else-if="searchType === 'topic'">
					<news-list :item="item" :index="index"></news-list>
				</template>
			</block>
			<load-more :status="loadState" iconType="circle" />
		</template>
		<template v-else-if="isNothing && list.length <= 0">
			<!-- 空白页 -->
			<nothing></nothing>
		</template>

	</view>
</template>

<script>
	import indexList from "../../components/index/index-list.vue";
	import newsList from '../../components/news/news-list.vue';
	import nothing from '../../components/common/nothing.vue';
	import loadMore from '../../components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			indexList,
			nothing,
			loadMore,
			newsList
		},
		data() {
			return {
				isNothing: false,
				searchText: '',
				loadState: 0,
				page: 1,
				list: [],
				searchType: 'post'
			}
		},
		// 监听返回按钮
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		// 监听搜索框输入
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text;
		},
		// 监听确定按钮
		onNavigationBarSearchInputConfirmed(e) {
			if (this.searchText) {
				uni.hideKeyboard();
				this.getData();
			}
		},
		// 监听页面触底事件
		onReachBottom() {
			this.loadMore();
		},
		onPullDownRefresh() {
			this.getData();
			uni.stopPullDownRefresh();
		},
		onLoad(e) {
			this.searchType = e.searchType
		},
		methods: {
			async getData() {
				uni.showLoading({title: "Loading..."});
				let url = '';
				switch (this.searchType){
					case 'post':
						url = '/search/post';
						break;
					case 'topic':
						url = '/search/topic';
						break;
				}
				let [err, res] = await this.$http.post(url, {
					keyword: this.searchText,
					page: this.page
				}, {
					token: true
				});
				if (!this.$http.errorCheck(err, res, () => {
						uni.hideLoading();
						this.isNothing = true;
					}, () => {
						uni.hideLoading();
						this.isNothing = true;
					})) return;

				let arr = [];
				let list = res.data.data.list;
				for (let i in list) {
					arr.push(this.__format(list[i]));
				}
				this.list = this.page > 1 ? this.list.concat(arr) : arr;
				this.isNothing = true;
				list.length < 10 ? this.loadState = 1:this.loadState = 0;
				uni.hideLoading();
			},
			__format(item) {
				switch (this.searchType){
					case 'post':
						return {
							userid:item.user.id,
							userHead:item.user.userpic,
							userName:item.user.username,
							isFocus:!!item.user.fans.length,
							id:item.id,
							comment:item.title,
							mediaType:"img", // img:图文,video:视频
							media:item.titlepic,
							video:false,
							path:item.path,
							share:!!item.share,
							like:{
								isLike:(item.support.length>0) ? (item.support[0].type+1) : 0,//0:没有操作，1:顶,2:踩；
								likeNum:item.like_count,
								dislikeNum:item.dislike_count,
							},
							commentnum:item.comment_count,
							sharenum:item.sharenum,
							contentPicList:item.images,
							userInfo:item.user.userinfo,
							titlepic: item.titlepic,
							title: item.title
						};
					case 'topic':
						return {
							id: item.id,
							src: item.titlepic,
							title: item.title,
							content: item.desc,
							trendNum: item.post_count,
							todayNum: item.todaypost_count
						};
				}
				
			},
			loadMore() {
				if (this.loadState != 0) {
					return;
				}
				this.loadState = 2;
				this.page++;
				this.getData();
			},
		}
	}
</script>

<style>

</style>
