<template>
	<view class="loader">{{loadText}}</view>
</template>

<script>
	export default {
		props: {
			loadState: Number
		},
		computed:{
			loadText: function(){
				if (this.loadState == 0) {
					return '上滑加载更多';					
				} else if(this.loadState == 1){
					return '没有更多数据了';					
				}else{
					return '加载中···';
				}
			}
		}
	}
</script>

<style scoped>
	.loader {
		text-align: center;
		width: 750rpx;
		/* display: block; */
		color: #AAAAAA;
		padding: 15rpx 0;
	}
</style>
