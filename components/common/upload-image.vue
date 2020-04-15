<template>
	<!-- 上传多图 -->
	<view class="uni-common-mt">
		<form>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title">点击可预览选好的图片</view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<view class="del-icon icon iconfont icon-shanchu" @tap="delImage(index)"></view>
										<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
									</view>
								</block>
								<view class="uni-uploader__input-box">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	];
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	];
	export default {
		data() {
			return {
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		methods: {
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					return;
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						this.$emit('upload', this.imageList);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			delImage(index){
				uni.showModal({
					title: '提示',
					content: '是否删除图片',
					success: res => {
						if (res.confirm) {
							this.imageList.splice(index,1);
							this.$emit('upload', this.imageList);
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	.cell-pd {
		padding: 22upx 30upx;
	}
	.list-pd {
		margin-top: 50upx;
	}
	.del-icon{
		position: absolute;
		background: #999999;
		color: #FFFFFF;
		font-size: 14upx;
		border-radius: 8upx;
		padding: 2upx 10upx;
		z-index: 1;
		right: 0;
		top: 0;
	}
	.uni-uploader__file{
		position: relative;
	}
</style>