<template>
	<view>
		<view class="user-space-head f-ac-jc">
			<image :src="userInfo.bgImage" mode="widthFix" lazy-load></image>
			<view class="user-space-info f-ac-jc">
				<image :src="userInfo.userpic" mode="widthFix" lazy-load></image>
				<view class="user-space-info-name all-margin">
					<text>{{userInfo.username}}</text> 
					<tag-age :age="userInfo.age" :sex="userInfo.sex" :border="true"></tag-age>
				</view>
				<view class="icon iconfont all-margin user-space-info-btn" :class="[isFocus?'focus-active':'icon-zengjia']" @tap="focus">{{isFocus?"已关注":"关注"}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tagAge from '../../components/common/tag-age.vue';
	export default {
		components: {
			tagAge
		},
		props:{
			userInfo:Object
		},
		data() {
			return {
				isFocus: this.userInfo.isFocus
			}
		},
		methods: {
			focus(){
				this.isFocus = !this.isFocus;
			}
		}
	}
</script>

<style scoped>
	/* common */
	.all-margin{
		margin-top: 20rpx;
	}
	
	.user-space-head{
		position: relative;
		height: 500rpx;
		overflow: hidden;
	}
	.user-space-head>image{
		width: 100%;
	}
	.user-space-head .user-space-info{
		position: absolute;
		flex-direction: column;
		top: 135rpx;
	}
	.user-space-head .user-space-info>image{
		width: 150rpx;
		height: 150rpx;
		border-radius: 100%;
	}
	
	.user-space-head .user-space-info .user-space-info-name{
		font-size: 33rpx;
		color: #FFFFFF;
		font-weight: bold;
	}
	.user-space-head .user-space-info .user-space-info-name>text{
		margin-right: 15rpx;
		text-shadow: 2rpx 2rpx 10rpx #333333;
	}
	.user-space-head .user-space-info-btn{
		background: #FFE934;
		color: #333333;
		padding: 0 15rpx 0 10rpx;
		border-radius: 15rpx;
		font-size: 28rpx;
	}
	.focus-active{
		background: #FFFFFF !important;
	}
</style>
