<template>
	<view class="space-homepage">
		<view class="space-info-block">
			<view class="block-title">用户信息</view>
			<view class="block-content">
				<view>已创建: {{getRegAge}}</view>
				<view>账户ID: {{userInfo.ID}}</view>
			</view>
		</view>
		<view class="space-info-block">
			<view class="block-title">个人信息</view>
			<view class="block-content">
				<view>星座: {{getHoroscope}}</view>
				<view>职业: {{userInfo.occupation}}</view>
				<view>故乡: {{userInfo.birthplace}}</view>
				<view>情感: {{userInfo.emotion}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import time from '../../common/time.js';
	export default {
		props: {
			userInfo: Object,
		},
		computed: {
			getRegAge() {
				return time.gettime.sumAge(this.userInfo.regTime);
			},
			getHoroscope() {
				return time.gettime.getHoroscope(this.userInfo.birthday);
			}
		}
	}
</script>

<style scoped>
	.space-info-block{
		padding: 15rpx 0;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.space-info-block .block-title{
		font-size: 32rpx;
		font-weight: bold;
		padding: 15rpx 0;
	}
	.space-info-block .block-content{
		color: #AAAAAA;
	}
</style>
