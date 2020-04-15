<template>
	<uni-nav-bar :fixed="true" :statusBar="true" :border="false" @clickRight="openUpdate">
		<block slot="left">
			<view class="nav-left">
				<view class="icon iconfont icon-qiandao"></view>
			</view>
		</block>
		<block>
			<view class="nav-title f-ac-jc">
				<block v-for="(item,index) in navList" :key="item.id">
					<view :class="{'active': index == navIndex}" @tap="changeTab(index)">
						{{item.name}}
						<view v-if="(index == navIndex)" class="nav-title-line"></view>
					</view>
				</block>
			</view>
		</block>
		<block slot="right">
			<view class="nav-right" @tap="openUpdatePost">
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</block>
	</uni-nav-bar>
</template>

<script>
	import uniNavBar from '../uni-nav-bar/uni-nav-bar.vue';
	export default {
		components:{
			uniNavBar
		},
		props:{
			navList:Array,
			navIndex: {
				type: Number,
				default: 0
			}
		},
		methods:{
			changeTab(index) {
				this.$emit("changeIndex", index)
			},
			openUpdatePost() {
				uni.navigateTo({
					url: '../../pages/update-post/update-post'
				});
			}
		}
	}
</script>

<style scoped>
	.nav-left .iconfont,
	.nav-right .iconfont {
		font-size: 22px;
	}
	
	.nav-left .iconfont {
		color: #ff9619;
	}
	
	.nav-title {
		width: 100%;
	}
	
	.nav-title .active {
		color: #000000;
	}
	
	.nav-title>view {
		font-size: 34upx;
		padding: 0 20upx;
		color: #969696;
		font-weight: bold;
		position: relative;
	}
	
	.nav-title>view .nav-title-line {
		content: '';
		display: block;
		position: absolute;
		border-radius: 20upx;
		border: 5.5upx solid #FEDE33;
		width: 45%;
		bottom: -4upx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
</style>
