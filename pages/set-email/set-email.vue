<template>
	<view class="body">
		<input type="text" placeholder="输入邮箱" v-model="email"/>
		<button type="primary" class="set-btn" @tap="submit" :class="{'set-btn-disable':disabled}" :disabled="disabled">{{this.isBind?"已绑定":"完成"}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBind: false,
				email:"",
				disabled:true
			}
		},
		onLoad(e) {
			if(e.email !== "false" && e.email && e.email !== 'null'){
				this.isBind = true;
				this.email = e.email;
			}
		},
		methods: {
			check(){
				if(!this.email || this.email == ""){
					uni.showToast({
						title:"请将信息填写完整",
						icon:"none",
						mask:true
					})
					return false;
				}
				// ***验证邮箱***
				var epattern= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				if(!epattern.test(this.email)){
					uni.showToast({
						title:"请输入正确的邮箱地址",
						icon:"none",
						duration:600
					})
					return false;
				}
				// ***验证密码***
				// if(this.newpsd !== this.repsd){
				// 	uni.showToast({
				// 		icon:"none",
				// 		title:"密码输入不一致"
				// 	})
				// 	return false;
				// }
				return true;
			},
			async submit(){
				let [err,res] = await this.$http.post('/user/bindEmail',{
					email:this.email
				},{
					token:true,
					checkToken:true,
				});
				// 请求失败处理
				if (!this.$http.errorCheck(err,res)) return this.disabled = false;
				// 成功
				this.isBind = true;
				
				// 修改状态，保存缓存
				this.User.userinfo.email = this.email;
				uni.setStorageSync("userinfo",this.User.userinfo);
				
				uni.showToast({ 
					title: '绑定成功！',
					success() {
						uni.navigateBack({
							delta:1
						})
					}
				});
			},
			change(){
				if(this.email && !this.isBind){
					this.disabled = false;
					return;
				}
				this.disabled = true;
			}
		},
		watch: {
			email(val) {
				this.change();
			}
		}
	}
</script>

<style>
	@import "../../common/form.css";
</style>
