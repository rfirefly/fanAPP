<template>
	<view class="f-list f-ac">
		<view class="head-pic">
			<image :src="item.userPic" mode="widthFix" lazy-load></image>
		</view>
		<view class="info">
			<view class="name">{{item.userName}}</view>
			<tag-age :age="item.userAge" :sex="item.userSex"></tag-age>
		</view>
		<view class="icon iconfont" :class="[item.following?'icon-xuanze-yixuan':'icon-zengjia1']" @tap="selected"></view>
	</view>
</template>

<script>
	import tagAge from "../common/tag-age.vue"
	export default {
		components: {
			tagAge
		},
		props: {
			item: Object
		},
		methods:{
			selected(){
				this.$emit("select")
			}
		}
	}
</script>

<style scoped>
	.f-list {
		margin: 0 25rpx;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.f-list .head-pic>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-right: 25rpx;
		flex-shrink: 0;
		vertical-align: top;
	}

	.f-list .info {
		flex: 1;
	}

	.f-list .info .name {
		font-size: 32rpx;
	}
	
	.f-list .icon-xuanze-yixuan,
	.f-list .icon-zengjia1{
		width: 60rpx;
	}

	.f-list .icon-xuanze-yixuan {
		color: #F8791B;
	}

	.f-list .icon-zengjia1 {
		color: #CCCCCC;
	}
</style>
