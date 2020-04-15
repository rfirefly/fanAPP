<template>
	<view>
		<!-- 标签条 -->
		<tab-bar :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></tab-bar>

		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{'height':swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in newslist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadMore(index)">
						<template v-if="items.list.length > 0">
							<!-- 内容列表 -->
							<block v-for="(item,index1) in items.list" :key="index1">
								<index-list :item="item" :index="index1" @changeIsFocus="updateData"></index-list>
							</block>
							<!-- 下拉 -->
							<load-more :status="items.loadState" iconType="circle"></load-more>
							<!-- <load-more :loadState="items.loadState"></load-more> -->
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
	import indexList from "../../components/index/index-list.vue";
	import tabBar from "../../components/index/tab-bar.vue";
	import loadMore from '../../components/uni-load-more/uni-load-more.vue';
	import nothing from '../../components/common/nothing.vue';
	export default {
		components: {
			indexList,
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
				newslist: []
			}
		},
		onLoad() {
			uni.getSystemInfo({
			    success: (res)=> {
					this.swiperheight = res.screenHeight - res.windowTop/10 - res.windowBottom - uni.upx2px(100);
			    }
			});
			this.getNav();
			uni.$on('updateData', this.updateData);
		},
		// 监听搜索框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?searchType=post'
			});
		},
		// 监听顶部按钮
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					uni.navigateTo({
						url: '../sign-in/sign-in',
					});
					break;
				case 1:
					this.User.navigate({
						url: '../update-post/update-post',
					});
					break;
			}
			console.log(e);
		},
		methods: {
			async getNav(){
				let [err, res] = await this.$http.get('/postClass');
				if(!this.$http.errorCheck(err, res)) return;
				let list = res.data.data.list;
				let arr = [];
				for (let obj in list) {
					arr.push({
						loadtext:1,
						list:[],
						page:1,
						firstload:true
					});
				}
				this.tabBars = list;
				this.newslist = arr;
				this.tabBars.length>0 && this.getList();
			},
			async getList(){
				let url = `/postclass/${this.tabBars[this.tabIndex].id}/post/${this.newslist[this.tabIndex].page}`;
				let [err,res] = await this.$http.get(url,{},{token:true});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) {
					this.newslist[this.tabIndex].loadState = 0;
					return;
				};
				let arr = [];
				let list = res.data.data.list;
				for (let i in list) {
					arr.push(this.format(list[i]));
				}
				this.newslist[this.tabIndex].list = this.newslist[this.tabIndex].page > 1 ? this.newslist[this.tabIndex].list.concat(arr) : arr;
				this.newslist[this.tabIndex].firstload = false;
				list.length < 10 ? this.newslist[this.tabIndex].loadState=1:this.newslist[this.tabIndex].loadState=0;
				return;
			},
			format(item){
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
			loadMore(index) {
				if (this.newslist[index].loadState != 0) {
					return;
				}
				this.newslist[index].loadState = 2;
				this.newslist[this.tabIndex].page++;
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
				this.newslist[this.tabIndex].list.forEach((item,index)=>{
					if (item.userid === data.userid) {
						item.isFocus = data.data;
					}
				})
			},
			updateSupport(data){
				let obj = this.newslist[this.tabIndex].list.find(val=>{
					return val.id === data.post_id;
				});
				if(!obj) return;
				let oldIsLike = obj.like.isLike;
				obj.like.isLike = (data.do == 'like')? 1 : 2;
				if(oldIsLike !== 0) oldIsLike==1 ? obj.like.likeNum-- : obj.like.dislikeNum--;
				if (obj.like.isLike !== 0) obj.like.isLike == 1 ? obj.like.likeNum++ : obj.like.dislikeNum++;
			}
		}
	}
</script>

<style>
</style>
