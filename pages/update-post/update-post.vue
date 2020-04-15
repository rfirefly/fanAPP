<template>
	<view class="page">
		<!--  narBar -->
		<uni-nav-bar rightText="发布" leftIcon="back" statusBar="true" @clickLeft="back" @click-right="submit">
			<view class="bar-center f-ac-jc" @tap="scope">
				{{scopeText}}
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uni-nav-bar>
		<!-- 多行文本输入框 -->
		<view class="uni-textarea">
			<textarea v-model="myContent" placeholder="说句话吧~" />
			</view>
		<upload-image @upload="upload"></upload-image>
		
		<uni-popup ref="showpopup">
			<view class="inform f-ac-jc">
				<view class="inform-img f-ac-jc">
					<image src="../../static/common/inform.png" mode="widthFix" lazy-load></image>
				</view>
				<view>1、禁止人身攻击等</view>
				<view>2、禁止人身攻击等</view>
				<view>3、禁止禁止人身攻击等禁止禁止人身攻击等</view>
				<button type="primary" hover-class="{background: #FFFFFF}" @tap="hidePopup">朕知道了</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var scopeList = ['所有人可见', '仅自己可见', '仅关注可见'];
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue";
	import uploadImage from '../../components/common/upload-image.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components:{
			uniNavBar,
			uploadImage,
			uniPopup
		},
		data() {
			return {
				isSave:true,
				scope: 1,
				myContent:'',
				imageList: []
			}
		},
		onReady(){
			this.openPopup();
		},
		onBackPress() {
			if (!this.myContent.length && this.imageList.length <= 0) {return;}
			if(this.isSave){
				this.save();
				return true;
			}
		},
		computed(){
			scopeText: function(){
				return scopeList[this.scope)]
			}
		},
		methods: {
			save(){
				uni.showModal({
					content: '是否保存为草稿？',
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if (res.confirm) {
							console.log("save");
						} else{
							console.log("don't save");
						}
						this.isSave = false;
						this.back();
					}
				});
			},
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			submit(){
				console.log("right btn");
			},
			scope(){
				uni.showActionSheet({
					itemList: scopeList,
					success: res => {
						this.scopeText = scopeList[res.tapIndex];
					}
				});
			},
			upload(list){
				this.imageList = list; 
			},
			hidePopup(){
				this.$refs.showpopup.close();
			},
			openPopup(){
				this.$refs.showpopup.open();
			}
		}
	}
</script>

<style scoped>
	.bar-center{
		width: 100%;
	}
	.uni-textarea{
		border-bottom: 1px solid #EEEEEE;
	}
	.inform{
		width: 65%;
		flex-direction: column;
		align-items: flex-start;
		background: #FFFFFF;
		margin: 0 auto;
		border-radius: 10upx;
		padding: 30upx;
	}
	.inform view{
		margin-bottom: 15upx;
	}
	.inform-img{
		width: 75%;
		height: auto;
		align-self: center;
	}
	.inform button{
		width: 95%;
		background: #FFE934;
		color: #171606;
		line-height: 1;
		padding: 25upx 0;
	}
</style>
