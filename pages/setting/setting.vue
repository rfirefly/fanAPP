<template>
	<view class="body">
		<view v-for="(item,index) in selectList" :key="index">
			<select-item :item="item" :index="index"></select-item>
		</view>
		<button class="set-btn" type="primary" @tap="logout">退出登录</button>
	</view>
</template>

<script>
	import selectItem from '../../components/common/select-item.vue';
	export default {
		components: {
			selectItem
		},
		data() {
			return {
				selectList: [{
						icon: "",
						name: "账号与安全",
						clickType: "navigateTo",
						url: "../../pages/set-accountAndSafe/set-accountAndSafe"
					},
					{
						icon: "",
						name: "资料编辑",
						clickType: "navigateTo",
						url: "../../pages/set-userinfo/set-userinfo"
					},
					{
						icon: "",
						name: "小纸条"
					},
					{
						icon: "",
						name: "清除缓存",
						clickType: "clear",
						url: ""
					},
					{
						icon: "",
						name: "意见反馈",
						clickType: "navigateTo",
						url: "../../pages/set-feedback/set-feedback"
					},
					{
						icon: "",
						name: "关于仿App",
						clickType: "navigateTo",
						url: "../../pages/set-about/set-about"
					}
				]

			}
		},
		methods: {
			logout() {
				this.User.logout();
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/form.css");
</style>
