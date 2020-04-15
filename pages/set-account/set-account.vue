<template>
	<view class="body">
		<input type="password" placeholder="输入旧密码" v-model="oldpsd" v-show="haspsd"/>
		<input type="password" placeholder="输入新密码" v-model="newpsd"/>
		<input type="password" placeholder="重新输入" v-model="repsd"/>
		<button type="primary" class="set-btn" @tap="submit" :class="{'set-btn-disable':disabled}" :disabled="disabled">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				haspsd: false,
				oldpsd:"",
				newpsd:"",
				repsd:"",
				disabled:true
			}
		},
		onLoad(e) {
			this.haspsd = !!(e.password && e.password !== "false");
		},
		methods: {
			check(){
				if(this.haspsd && (!this.oldpsd || this.oldpsd=="")){
					uni.showToast({ title: '旧密码不能为空', icon:"none" });
					return false;
				}
				if(!this.newpsd || this.newpsd==""){
					uni.showToast({ title: '新密码不能为空', icon:"none" });
					return false;
				}
				if(!this.repsd || this.repsd==""){
					uni.showToast({ title: '确认密码不能为空', icon:"none" });
					return false;
				}
				if(this.newpsd !== this.repsd){
					uni.showToast({ title: '确认密码和新密码不一致', icon:"none" });
					return false;
				}
				return true;
			},
			async submit(){
				if(!this.check()) return;
				this.disabled = true;
				let [err,res] = await this.$http.post('/rePassword',{
					oldpassword:this.oldpassword || 0,
					newpassword:this.newpassword,
					renewpassword:this.renewpassword,
				},{
					token:true,
					checkToken:true
				})
				if(!this.$http.errorCheck(err,res)){
					this.disabled = false;
					return;
				}
				// 修改状态，缓存
				this.User.userinfo.password = true;
				uni.setStorageSync('userinfo',this.User.userinfo);
				this.disabled = false;
				return uni.showToast({
					title: '修改密码成功！',
					success: () => {
						uni.navigateBack({ delta: 1 });
					}
				});
			},
			change(){
				if(this.newpsd && this.repsd){
					this.disabled = false;
					return;
				}
				if(!this.oldpsd && this.haspsd){
					this.disabled = true;
					return;
				}
				this.disabled = true;
			}
		},
		watch: {
			oldpsd(val) {
				this.change();
			},
			newpsd(val) {
				this.change();
			},
			repsd(val) {
				this.change();
			}
		},
	}
</script>

<style>
	@import url("../../common/form.css");
</style>
