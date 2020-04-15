<template>
	<view>
		<view class="papers-menu-mask" v-show="show" @tap="hidden"></view>
		<view class="papers-menu animated" :class="[show?'fadeIn':'fadeOut']" v-show="show">
			<view class="f-ac" hover-class="menu-hover-item" @tap="dislike">
				<view class="icon iconfont icon-sousuo"></view>
				拉黑
			</view>
			<view class="f-ac" hover-class="menu-hover-item" @tap="remark">
				<view class="icon iconfont icon-shanchu"></view>
				备注
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			show:Boolean
		},
		methods: {
			hidden(){
				this.$emit("hidden")
			},
			dislike(){
				this.$emit("dislike")
			},
			remark(){
				this.$emit("remark")
			}
		}
	}
</script>

<style>
	.papers-menu-mask{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
	.papers-menu{
		position: fixed;
		background: #FFFFFF;
		top: 100rpx;
		right: 0;
		border-radius: 8rpx;
		width: 55%;
		z-index: 999;
		box-sizing: border-box;
		box-shadow: 1rpx 1rpx 20rpx 2rpx #CCCCCC;
	}
	
	.papers-menu>view{
		padding: 20rpx;
		font-size: 35rpx;
		font-weight: bold;
	}
	.papers-menu .icon{
		margin-right: 20rpx;
	}
	.papers-menu .menu-hover-item{
		background: #EEEEEE;
	}
</style>
