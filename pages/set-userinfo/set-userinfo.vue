<template>
	<view>
		<view class="body">
			<!-- 头像 -->
			<view class="info-item f-ac-jsb">
				<view class="tip">头像</view>
				<view class="content f-ac-jc" @tap="changeUserpic">
					<image :src="userpic" mode="aspectFill" lazy-load></image>
					<view class="icon iconfont icon-bianji1">
					</view>
				</view>
			</view>
			<!-- 用户名 -->
			<view class="info-item f-ac-jsb">
				<view class="tip">用户名</view>
				<view class="content f-ac-jc">
					<input type="text" v-model="username" />
					<view class="icon iconfont icon-bianji1">
					</view>
				</view>
			</view>
			<!-- 性别 -->
			<view class="info-item f-ac-jsb">
				<view class="tip">性别</view>
				<view class="content f-ac-jc" @tap="change('sex')">
					<view>{{sexArr[sex]}}</view>
					<view class="icon iconfont icon-bianji1">
					</view>
				</view>
			</view>
			<!-- 生日 -->
			<view class="info-item f-ac-jsb">
				<view class="tip">生日</view>
				<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="content f-ac-jc">
						<view>{{birthday}}</view>
						<view class="icon iconfont icon-bianji1"></view>
					</view>
				</picker>
			</view>
			<!-- 职业 -->
			<view class="info-item f-ac-jsb">
				<view class="tip">职业</view>
				<view class="content f-ac-jc" @tap="change('job')">
					<view>{{jobArr[job]}}</view>
					<view class="icon iconfont icon-bianji1">
					</view>
				</view>
			</view>
			<!-- 住址 -->
			<view class="info-item f-ac-jsb">
				<view class="tip">住址</view>
				<view class="content f-ac-jc" @tap="showPicker">
					<view>{{address}}</view>
					<view class="icon iconfont icon-bianji1">
					</view>
				</view>
			</view>
			<button type="primary" class="set-btn" @tap="submit">完成</button>
			
			<mpvue-picker
				:themeColor="themeColor"
				ref="mpvuePicker"
				:mode="mode"
				:deepLength="deepLength"
				:pickerValueDefault="pickerValueDefault"
				@onConfirm="onConfirm"
			></mpvue-picker>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue';
	
	let sexArr = ['保密', '男', '女'];
	let jobArr = ['其他', 'IT', '工程师'];
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				sexArr: sexArr,
				jobArr: jobArr,
				userpic: "",
				username: "",
				sex: 0,
				job: 0,
				birthday: "未知",
				address:"",
				themeColor: '#007AFF',
				pickerValueDefault: [0,0,0],
				deepLength: 3,
				mode: '',
			}
		},
		onLoad() {
			this.userpic = this.User.userinfo.userpic;
			this.username = this.User.userinfo.username;
			this.sex = this.User.userinfo.userinfo.sex || 0;
			this.job = this.User.userinfo.userinfo.job || 0;
			this.birthday = this.User.userinfo.userinfo.birthday || "未知";
			this.address = this.User.userinfo.userinfo.path || "未知";
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			async submit() {
				let data = {
					name: this.username,
					sex:this.sex,
					job:this.job,
					birthday:this.birthday,
					path:this.address
				};
				let [err,res] = await this.$http.post('/editUserinfo',data,{
					token:true,
					checkToken:true
				});
				// 请求失败处理
				if (!this.$http.errorCheck(err,res)) return;
				// 成功
				uni.showToast({ title: '修改成功！' });
				// 修改状态，缓存
				this.User.userinfo.username = this.username;
				this.User.userinfo.userinfo = data;
				uni.setStorageSync('userinfo',this.User.userinfo);
			},
			async changeUserpic() {
				let [err, res] = await uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
				})
				if (!res) return;
				// 上传
				uni.showLoading({ title: '上传中...', mask: false });
				let [err2,res2] = await this.$http.upload('/editUserpic',{
					name: 'userpic',
					filePath: res.tempFilePaths[0],
					header: {
						'Content-Type': 'multipart/form-data'
					},
					token:true,
					checkToken:true
				});
				let data = JSON.parse(res2.data);
				// 上传失败
				if (err2 || data.errorCode) {
					uni.showToast({ title: data.msg ? data.msg : '上传失败', icon:"none" });
					uni.hideLoading();
					return false;
				}
				// 成功
				uni.hideLoading();
				uni.showToast({ title: '修改头像成功!' });
				this.userpic = data.data;
				// 修改状态，存储
				this.User.userinfo.userpic = this.userpic;
				uni.setStorageSync("userinfo",this.User.userinfo);
			},
			change(val) {
				let arr = [];
				switch (val) {
					case 'sex':
						arr = sexArr;
						break;
					case 'job':
						arr = jobArr;
						break;
					default:
						break;
				}
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						this[val] = res.tapIndex;
					}
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange(e) {
				this.birthday = e.target.value;
			},
			onConfirm(e) {
				this.address = e.label;
			},
			showPicker() {
				this.mode = 'selector';
				this.deepLength = 3;
				this.pickerValueDefault = [0,0,0];
				this.$refs.mpvuePicker.show();
			}
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
			}
		}
	}
</script>

<style>
	@import url("../../common/form.css");


	.info-item {
		padding: 20rpx;
		border-bottom: 1rpx solid #F4F4F4;
	}

	.info-item .tip {
		font-size: 32rpx;
		color: #989898;
		font-weight: bold;
	}

	.info-item .content>image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}

	.info-item .content .icon {
		margin-left: 20rpx;
		font-size: 40rpx;
		color: #989898;
	}

	.info-item .content>input {
		text-align: right;
		border-bottom: 0;
		margin: 0;
		padding-bottom: 0;
	}
</style>
