<template>
	<view>
		<view class="share-mask" @tap="closeShare"></view>
		<view class="share animated fadeInUp">
			<view class="share-title f-ac-jc">分享到</view>

			<scroll-view scroll-x class="share-icon f-ac">
				<block v-for="(val,index) in providerList" :key="index">
					<view class="share-icon-item" hover-class="share-hover" @tap="share(val)">
						<view class="icon iconfont" :class="[val.zicon, val.zclass]"></view>
						<view>{{val.name}}</view>
					</view>
				</block>
			</scroll-view>

			<view class="share-quit f-ac-jc" hover-class="share-hover" @tap="closeShare">取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			sharedata:Object,
		},
		data() {
			return {
				providerList: []
			}
		},
		onReady() {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					// e.provider = ['weixin','sinaweibo','qq'];
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '微信好友',
									id: 'weixin',
									zicon:"icon-weixin",
									zclass:"share-weixin-bg",
									sort:0
								})
								data.push({
									name: '朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									zicon:"icon-weixin",
									zclass:"share-pyq-bg",
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '新浪微博',
									id: 'sinaweibo',
									zicon:"icon-xinlangweibo",
									zclass:"share-wb-bg",
									sort:2
								})
								break;
							case 'qq':
								data.push({
									name: 'QQ好友',
									id: 'qq',
									zicon:"icon-QQ",
									zclass:"share-qq-bg",
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					
				}
			});
		},
		methods: {
			async share(e) {
				console.log('分享通道:' + e.id + '； 分享类型:' + this.sharedata.shareType);
				if (!this.sharedata.shareText && (this.sharedata.shareType === 1 || this.sharedata.shareType === 0)) {
					uni.showModal({
						content: '分享内容不能为空',
						showCancel: false
					})
					return;
				}

				if (!this.sharedata.image && (this.sharedata.shareType === 2 || this.sharedata.shareType === 0)) {
					uni.showModal({
						content: '分享图片不能为空',
						showCancel: false
					})
					return;
				}

				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.sharedata.shareType,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel: false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel: false
						})
					},
					complete: function() {
						console.log('分享操作结束!')
					}
				}

				switch (this.sharedata.shareType) {
					case 0:
						shareOPtions.summary = this.sharedata.shareText;
						shareOPtions.imageUrl = this.sharedata.image;
						shareOPtions.title = this.sharedata.title;
						shareOPtions.href = this.sharedata.href;
						break;
					case 1:
						shareOPtions.summary = this.sharedata.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.sharedata.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.sharedata.image ? this.sharedata.image :
							'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
						shareOPtions.title = this.sharedata.title;
						shareOPtions.miniProgram = {
							id: 'gh_33446d7f7a26',
							path: '/pages/tabBar/component/component',
							webUrl: 'https://uniapp.dcloud.io',
							type: 0
						};
						break;
					default:
						break;
				}

				if (shareOPtions.type === 0 && plus.os.name === 'iOS') { //如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if (shareOPtions.type === 1 && shareOPtions.provider === 'qq') { //如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = this.sharedata.href;
					shareOPtions.title = this.sharedata.title;
				}
				uni.share(shareOPtions);
			},
			compress() { //压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.sharedata.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => { // 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if (file.size > 20480) { // 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content: '分享图片太大,需要请重新选择图片!',
										showCancel: false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content: '分享图片太大,需要请重新选择图片!',
							showCancel: false
						})
					});
				})
			},
			closeShare() {
				this.$emit("isShowShare")
			}
		},
	}
</script>

<style scoped>
	.share-mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(51, 51, 51, .6);
		z-index: 10;
	}

	.share {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #FFFFFF;
		z-index: 100;
	}

	.share .share-title {
		margin: 20rpx 0;
		font-size: 32rpx;
		font-weight: bold;
	}

	.share-icon {
		white-space: nowrap;
	}

	.share-icon .share-icon-item {
		text-align: center;
		width: 25%;
		display: inline-block;
		padding: 20rpx 0;
	}

	.share-icon .share-icon-item .icon {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		font-size: 50rpx;
		line-height: 100rpx;
		margin: 0 auto;
		color: #FFFFFF;
	}

	.share-quit {
		border-top: 1rpx solid #EEEEEE;
		font-size: 36rpx;
		padding: 20rpx 0;
	}

	.share-hover {
		background-color: #EEEEEE;
	}

	.share-weixin-bg {
		background: #2AD19B;
	}

	.share-pyq-bg {
		background: #514D4C;
	}

	.share-wb-bg {
		background: #EE5E5E;
	}

	.share-qq-bg {
		background: #4A73BA;
	}
</style>
