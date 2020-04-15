<template>
	<view>
		<view v-for="(item,index) in selectList" :key="index">
			<select-item :item="item" :index="index" @updateuserbind="__init()"></select-item>
		</view>
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
				selectList: []
			}
		},
		onShow(){
			this.__init();
		},
		methods: {
			async __init(){
				// 获取当前用户绑定情况
				this.selectList = [
					{
						icon: "",
						name: "手机号",
						clickType: "navigateTo",
						url: "../../pages/set-bindPhone/set-bindPhone?phone=" +this.User.userinfo.phone || false,
						data: this.User.userinfo.phone || "未绑定"
					},
					{
						icon: "",
						name: "登入密码",
						clickType: "navigateTo",
						url: "../../pages/set-account/set-account?password="+this.User.userinfo.password
					},
					{
						icon: "",
						name: "邮箱绑定",
						clickType: "navigateTo",
						url: "../../pages/set-email/set-email?email="+this.User.userinfo.email || false,
						data: this.User.userinfo.email || "未绑定"
					}
				]
				// #ifdef APP-PLUS
				// 获取当前用户第三方登录绑定情况
				let arr = [
					{ icon:"",name:"微信账号",clickType:"bind",url:"" ,data:"未绑定" ,provider:"weixin"},
					{ icon:"",name:"微博账号",clickType:"bind",url:"" ,data:"未绑定",provider:"sinaweibo"},
					{ icon:"",name:"QQ账号",clickType:"bind",url:"" ,data:"未绑定",provider:"qq"},
				];
				if (!this.User.userbind) {
					await this.User.getUserBind();
				}
				for (let i in this.User.userbind) {
					switch (this.User.userbind[i].type){
						case "weixin":
							arr[0].data = this.User.userbind[i].nickname;
							break;
						case "sinaweibo":
							arr[1].data = this.User.userbind[i].nickname;
							break;
						case "qq":
							arr[2].data = this.User.userbind[i].nickname;
							break;
						default:
							break;
					}
				}
				this.selectList = [...this.selectList,...arr];
				// #endif
			}
		}
	}
</script>

<style>

</style>
