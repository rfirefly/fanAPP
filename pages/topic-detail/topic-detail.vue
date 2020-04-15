<template>
	<view>
		<!-- 头部介绍 -->
		<topic-head :item="topicHead"></topic-head>
		<!-- 选项栏 -->
		<tab-bar listBorder="border-bottom:0;" itemWidth="width:50%;" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></tab-bar>
		<!-- 内容 -->
		<view class="topicList">
			<block v-for="(items,index) in topicList" :key="index">
				<template v-if="index == tabIndex">
					<block v-for="(item,index1) in items.list" :key="index1">
						<common-list :item="item" :index="index1" @changeIsFocus="updateData"></common-list>
					</block>
					<load-more :loadState="items.loadState"></load-more>
				</template>
			</block>
		</view>
	</view>
</template>

<script>
	import loadMore from '../../components/common/load-more.vue';
	import commonList from '../../components/common/common-list.vue';
	import topicHead from '../../components/topic/topic-head.vue';
	import tabBar from "../../components/index/tab-bar.vue";
	
	export default {
		components: {
			topicHead,
			tabBar,
			commonList,
			loadMore
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: "关注",
						id: "guanzhu"
					},
					{
						name: "推荐",
						id: "tuijian"
					}
				],
				topicHead: {},
				topicList: [{
						loadState: 2, // 0:more, 1: noMore
						page:1,
						list: []
					},
					{
						loadState: 2, // 0:more, 1: noMore
						page:1,
						list: []
					}
				]
			}
		},
		onLoad(e) {
			let data = JSON.parse(e.detail);
			this.__init(data);
			uni.$once('updateData', this.updateData);
		},
		onReachBottom() {
			this.loadMore();
		},
		onPullDownRefresh() {
				this.refresh();
				uni.stopPullDownRefresh();
		},
		methods: {
			__init(obj){
				uni.setNavigationBarTitle({title: obj.title});
				this.topicHead = obj;
				this.refresh();
			},
			// 获取数据
			async refresh() {
				let url = `/topic/${this.topicHead.id}/post/${this.topicList[this.tabIndex].page}`;
				let [err,res] = await this.$http.get(url,{},{token:true});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) {
					return this.topicList[this.tabIndex].loadState=0;
				};
				// 数据处理
				let arr = [];
				let list = res.data.data.list;
				for (let i in list) {
					arr.push(this.__format(list[i]));
				}
				this.topicList[this.tabIndex].list = this.topicList[this.tabIndex].page > 1 ? this.topicList[this.tabIndex].list.concat(arr) : arr;
				this.topicList[this.tabIndex].list.length < 10 ? this.topicList[this.tabIndex].loadState=1:this.topicList[this.tabIndex].loadState=0;
				return;
			},
			__format(item){
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
				}
			},
			loadMore() {
				if (this.topicList[this.tabIndex].loadState != 0) {
					return;
				}
				this.topicList[this.tabIndex].loadState = 2; // 0:more, 1: noMore, 2:loading
				this.topicList[this.tabIndex].page++;
				this.refresh();
			},
			tabtap(index) {
				this.tabIndex = index;
				this.refresh();
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
				this.topicList[this.tabIndex].list.forEach((item,index)=>{
					if (item.userid === data.userid) {
						item.isFocus = data.data;
					}
				})
			}
		}
	}
</script>

<style>

</style>
