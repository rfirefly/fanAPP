<template>
	<view>
		<!-- 未登入 -->
		<template v-if="!loginStatus">
			<no-login @logining="isLogin()"></no-login>
		</template>
		<!-- 已登入 -->
		<template v-else>
			<has-login :homeinfo="homeinfo"></has-login>
		</template>
		<!-- 数据 -->
		<home-data :homeData="homeData"></home-data>
		<!-- 广告位 -->
		<home-ad :adPic="adpic"></home-ad>
		<!-- 选择菜单 -->
		<view v-for="(item,index) in selectList" :key="index">
			<select-item :item="item" :index="index"></select-item>
		</view>
	</view>
</template>

<script>
	import selectItem from '../../components/common/select-item.vue';
	import noLogin from '../../components/home/no-login.vue';
	import hasLogin from '../../components/home/has-login.vue';
	import homeData from '../../components/home/home-data.vue';
	import homeAd from '../../components/home/home-ad.vue';
	export default {
		components: {
			selectItem,
			noLogin,
			hasLogin,
			homeData,
			homeAd
		},
		data() {
			return {
				loginStatus: false,
				adpic: "../../static/demo/demo20.jpg",
				selectList: [{
						icon: "icon-liulan",
						name: "浏览历史",
						iconColor: "#2AD19B",
						clickType: "",
						url: ""
					},
					{
						icon: "icon-huiyuanvip",
						name: "会员认证",
						iconColor: "#EE5E5E"
					},
					{
						icon: "icon-keyboard",
						name: "审核动态",
						iconColor: "#FF6D00"
					}
				],
				homeData: [{
						name: "内容",
						num: 0
					},
					{
						name: "动态",
						num: 0
					},
					{
						name: "评论",
						num: 0
					},
					{
						name: "收藏",
						num: 0
					},
				],
				homeinfo: {
					userpic: "",
					username: "",
					totalnum: 0,
					todaynum: 0,
				}
			}
		},
		onShow() {
			this.isLogin();
		},
		methods: {
			isLogin(){
				if (!this.User.token) {
					this.loginStatus = false;
					this.homeinfo = {
						userpic: "",
						username: "",
						totalnum: 0,
						todaynum: 0,
					};
					this.homeData[0].num = 0;
					this.homeData[1].num = 0;
					this.homeData[2].num = 0;
					this.homeData[3].num = 0;
					return;
				}
				// 用户已登录
				this.homeinfo.userpic = this.User.userinfo.userpic;
				this.homeinfo.username = this.User.userinfo.username;
				this.homeinfo.totalnum = this.User.counts.post_count || 0;
				this.homeinfo.todaynum = this.User.counts.today_posts_count || 0;
				this.homeData[0].num = this.User.counts.post_count || 0;
				this.homeData[1].num = this.User.counts.post_count || 0;
				this.homeData[2].num = this.User.counts.comments_count || 0;
				this.homeData[3].num = this.User.counts.like_count || 0;
				this.loginStatus = true;
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				return this.User.navigate({
					url: "../setting/setting"
				});
			}
		}
	}
</script>

<style>
</style>
