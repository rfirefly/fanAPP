import $http from "./request.js"
export default{
	token: false,
	userinfo: false,
	userbind: false,
	counts:{},
	navigate(options, type = "navigateTo"){
		if(!$http.checkToken(true)) return;
		if(!$http.checkAuth(options.checkAuth)) return;
		switch (type){
			case "navigateTo":
				uni.navigateTo(options);
				break;
			case "redirectTo":
				uni.redirectTo(options);
				break;
			case "reLaunch":
				uni.reLaunch(options);
				break;
			case "switchTab":
				uni.switchTab(options);
				break;
			case "navigateBack":
				uni.navigateBack(options);
				break;
			default:
				break;
		}
	},
	__init(){
		this.token = uni.getStorageSync('token');
		this.userinfo = uni.getStorageSync('userinfo');
		this.counts = uni.getStorageSync('counts');
		this.userbind = uni.getStorageSync('userbind');
	},
	async getCounts(){
		// 统计获取用户相关数据（总文章数，今日文章数，评论数 ，关注数，粉丝数，文章总点赞数）
		let [err,res] =await $http.get('/user/getCounts',{},{
			token:true,checkToken:true
		})
		// 请求错误处理
		if (!$http.errorCheck(err,res)) return false;
		// 成功
		this.counts = res.data.data.list;
		// 存储缓存
		uni.setStorageSync("counts", this.counts);
		return true;
	},
	async getUserBind(){
		// 统计获取用户相关数据（总文章数，今日文章数，评论数 ，关注数，粉丝数，文章总点赞数）
		let [err,res] =await $http.get('/user/getUserBind',{},{
			token:true,checkToken:true
		})
		// 请求错误处理
		if (!$http.errorCheck(err,res)) return false;
		// 成功
		this.userbind = res.data.data.list;
		// 存储缓存
		uni.setStorageSync("userbind", this.userbind);
		return true;
	},
	// 退出登录
	async logout(showToast = true){
		// 退出登录
		await $http.post('/user/logout',{},{ 
			token:true,
			checkToken:true ,
		});
		// 清除缓存
		uni.removeStorageSync('userinfo');
		uni.removeStorageSync('token');
		uni.removeStorageSync('counts');
		// 清除状态
		this.token = false;
		this.userinfo = false;
		this.userbind = false;
		this.counts = {};
		// 关闭socket
		// 返回home页面
		uni.switchTab({ url:"/pages/home/home" })
		// 退出成功
		if (showToast) {
			uni.showToast({title:'退出登录成功'});
			return;
		}
	},
	async login(options={}){
		uni.showLoading({
			title: '登入中...',
			mask: false
		});
		let [err,res] = await $http.post(options.url,options.data);
		if (!$http.errorCheck(err,res)) {
			uni.hideLoading();
			return false
		};
		// 登录成功 保存状态
		this.token = res.data.data.data.token;
		this.userinfo = this.__formatUserinfo(res.data.data.data);
		// 本地存储
		uni.setStorageSync("userinfo",this.userinfo);
		uni.setStorageSync("token", this.token);
		// 获取用户相关统计
		await this.getCounts();
		// 连接socket
		// 成功提示
		uni.showToast({ title: '登录成功' });
		// 返回上一步
		if (!options.Noback) {
			uni.navigateBack({ delta: 1 });
		}
		uni.hideLoading();
		return true;
	},
	__formatUserinfo(obj){
		// 手机/邮箱/账号登录
		if (obj.loginType == "username" || obj.loginType == "email" || obj.loginType == "phone") {
			// 设置默认头像
			obj.userpic = obj.userpic || "https://krplus-pic.b0.upaiyun.com/avatar/201812/28095646/fde0v5pcswzft2s8!120";
			return obj;
		}
		// 第三方登录（已绑定）
		if (obj.user && obj.user_id > 0) {
			return {
				id: obj.user.id,
				username: obj.user.username || obj.nickname,
				userpic: obj.user.userpic || obj.avatarurl,
				phone: obj.user.phone,
				email: obj.user.email,
				status: obj.user.status,
				create_time: obj.user.create_time,
				logintype: obj.logintype,
				password:obj.user.password,
				token: obj.token,
				userinfo: {
				    id: obj.user.userinfo.id,
				    user_id: obj.user.userinfo.user_id,
				    age: obj.user.userinfo.age,
				    sex: obj.user.userinfo.sex,
				    qg: obj.user.userinfo.qg,
				    job: obj.user.userinfo.job,
				    path: obj.user.userinfo.path,
				    birthday: obj.user.userinfo.birthday,
				}
			}
		}
		// 第三方登录（未绑定）
		return {
			id: obj.user_id,
			username: obj.nickname,
			userpic: obj.avatarurl,
			phone: false,
			email: false,
			status: 1,
			create_time: false,
			logintype: obj.logintype,
			token: obj.token,
			userinfo: false
		}
	},
	// 转换第三方登录格式
	__formatOtherLogin(provider,options){
		return {
			provider:provider,
			openid:options.userInfo.unionId || options.userInfo.openId,
			expires_in:options.authResult.expires_in,
			nickName:options.userInfo.nickName,
			avatarUrl: options.userInfo.headimgurl || options.userInfo.avatarUrl,
		}
	},
	
}