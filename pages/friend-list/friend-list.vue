<template>
	<view>
		<!-- tab bar -->
		<tab-bar itemWidth="width:33.3%;" :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></tab-bar>
		<!-- friend list -->
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items,index) in userInfo" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadMore(index)">
						<template v-if="items.list.length > 0">
							<!-- 内容列表 -->
							<view class="topic-s">
								<block v-for="(item,indexItem) in items.list" :key="indexItem">
									<friend-item :item="item" @select="select(index,indexItem)"></friend-item>
								</block>
							</view>
							<!-- 下拉 -->
							<load-more :loadState="items.loadState"></load-more>
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
	import loadMore from '../../components/common/load-more.vue';
	import nothing from '../../components/common/nothing.vue';
	import tabBar from "../../components/index/tab-bar.vue";
	import friendItem from "../../components/papers/friend-item.vue"
	export default {
		components: {
			tabBar,
			friendItem,
			loadMore,
			nothing
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 0,
				tabBars: [{
						name: "互关",
						id: "mutualFollowing",
						num: 10
					},
					{
						name: "关注",
						id: "Following",
						num: 20
					},
					{
						name: "粉丝",
						id: "fans",
						num: 30
					}
				],
				userInfo: [{
						loadState: 0,
						list: [{
								userName: "fasd",
								userPic: "../../static/demo/userpic/6.jpg",
								userAge: 18,
								userSex: 1,
								following: false
							},
							{
								userName: "12sd",
								userPic: "../../static/demo/userpic/5.jpg",
								userAge: 23,
								userSex: 0,
								following: false
							},
							{
								userName: "fausd",
								userPic: "../../static/demo/userpic/4.jpg",
								userAge: 18,
								userSex: 1,
								following: true
							},
							{
								userName: "fasd",
								userPic: "../../static/demo/userpic/6.jpg",
								userAge: 18,
								userSex: 1,
								following: false
							},
							{
								userName: "12sd",
								userPic: "../../static/demo/userpic/5.jpg",
								userAge: 23,
								userSex: 0,
								following: false
							},
							{
								userName: "fausd",
								userPic: "../../static/demo/userpic/4.jpg",
								userAge: 18,
								userSex: 1,
								following: true
							},
							{
								userName: "fasd",
								userPic: "../../static/demo/userpic/6.jpg",
								userAge: 18,
								userSex: 1,
								following: false
							},
							{
								userName: "12sd",
								userPic: "../../static/demo/userpic/5.jpg",
								userAge: 23,
								userSex: 0,
								following: false
							},
							{
								userName: "fausd",
								userPic: "../../static/demo/userpic/4.jpg",
								userAge: 18,
								userSex: 1,
								following: true
							}
						]
					},
					{
						loadState: 0,
						list: [{
								userName: "fasd",
								userPic: "../../static/demo/userpic/6.jpg",
								userAge: 18,
								userSex: 1,
								following: false
							},
							{
								userName: "12sd",
								userPic: "../../static/demo/userpic/5.jpg",
								userAge: 23,
								userSex: 0,
								following: false
							},
							{
								userName: "fausd",
								userPic: "../../static/demo/userpic/4.jpg",
								userAge: 18,
								userSex: 1,
								following: true
							}
						]
					},
					{
						loadState: 0,
						list: [{
								userName: "fasd",
								userPic: "../../static/demo/userpic/6.jpg",
								userAge: 18,
								userSex: 1,
								following: false
							},
							{
								userName: "12sd",
								userPic: "../../static/demo/userpic/5.jpg",
								userAge: 23,
								userSex: 0,
								following: false
							},
							{
								userName: "fausd",
								userPic: "../../static/demo/userpic/4.jpg",
								userAge: 18,
								userSex: 1,
								following: true
							}
						]
					}
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.swiperheight = res.screenHeight - res.windowTop / 10 - res.windowBottom - uni.upx2px(100);
				}
			});
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
			},
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			select(index, indexItem) {
				this.userInfo[index].list[indexItem].following = !this.userInfo[index].list[indexItem].following;
			},
			loadMore(index) {
				if (this.userInfo[index].loadState != 0) {
					return;
				}
				this.userInfo[index].loadState = 2;
				setTimeout(() => {
					let listData = {
						userName: "fasd",
						userPic: "../../static/demo/userpic/6.jpg",
						userAge: 18,
						userSex: 1,
						following: false
					};
					this.userInfo[index].list.push(listData);
					this.userInfo[index].loadState = 0;
				}, 300);
			},
		}
	}
</script>

<style>

</style>
