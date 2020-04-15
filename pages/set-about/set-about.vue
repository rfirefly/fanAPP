<template>
	<view class="body">		
		<view class="set-about f-ac">
			<image src="../../static/common/logo.png" mode="widthFix" lazy-load></image>
			<view class="version">version 1.0.0</view>
		</view>
		<view v-for="(item,index) in selectItem" :key="index">
			<select-item :item="item" :index="index"></select-item>
		</view>
	</view>
</template>

<script>
	import selectItem from '../../components/common/select-item.vue';
	export default {
		components: {
			selectItem
		},
		data() {
			return {
				selectItem:[
					{icon:"", name:"新版本检测"},
					{icon:"", name:"仿App用户协议"}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("../../common/form.css");
	.set-about{
		flex-direction: column;
		margin-top: 50rpx;
	}
	
	.set-about>image{
		width: 70%;
	}
	.set-about .version{
		font-size: 32rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		color: #CCCCCC;
	}
</style>
