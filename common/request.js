import Config from './config.js';
import User from './user.js';
import Lib from './lib.js';

export default {
	config: {
		baseUrl: Config.webURL,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: {},
		method: "GET",
		dataType: "json",
	},
	request(options = {}) {
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.baseUrl + options.url;
		// 一些场景，需要验证token
		if(options.token){
			// 验证用户是否登入
			if(!this.checkToken(options.checkToken)) return;
			if(!this.checkAuth(options.checkAuth)) return;
			options.header.token = User.token;
		}
		return uni.request(options);
	},
	get(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options);
	},
	post(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options);
	},
	// 上传图片
	upload(url,options = {}){
		options.url = this.config.baseUrl + url;
		options.header = options.header || this.config.header;
		options.fileType = options.fileType || "image";
		options.formData = options.formData || {};
		options.filePath = options.filePath;
		options.name = options.name;
		// TODO：token增加等操作
		if(options.token){
			// 验证用户是否登入
			if(!this.checkToken(options.checkToken)) return;
			if(!this.checkAuth(options.checkAuth)) return;
			options.header.token = User.token;
		}
		return uni.uploadFile(options);
	},
	errorCheck(err, res, errfun = false, resfun=false){
		if(err){
			typeof errfun === 'function' && errfun();
			Lib.toast('加载失败');
			return false;
		}
		if(res.data.errorCode){
			typeof resfun === 'function' && resfun();
			Lib.toast(res.data.msg);
			return false;
		}
		return true;
	},
	checkToken(checkToken){
		if(checkToken && !User.token){
			uni.navigateTo({url: '/pages/login/login'});
			return false;
		}
		return true;
	},
	checkAuth(checkAuth){
		if(checkAuth && !User.userinfo.phone){
			uni.navigateTo({url: '/pages/set-bindPhone/set-bindPhone'});
			return false;
		}
		return true;
	}
}
