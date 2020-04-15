<template>
	<view class="body">
		<view class="content">
			<uni-collapse accordion="true">
				<view v-for="(item,index) in data" :key="index">
					<uni-collapse-item :title="item.subName" :showAnimation="true">
						<text class="content">{{item.content}}</text>
					</uni-collapse-item>
				</view>
			</uni-collapse>
		</view>
		
		<button class="set-btn" type="primary" @tap="goFeedback">意见反馈</button>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				data: [{
						subName: '客服何时上线？',
						content: '123321'
					},
					{
						subName: '如何修改密码？',
						content: '123321。'
					}]
			}
		},
		methods: {
			goFeedback(){
				uni.navigateTo({
					url:"../set-user-feedback/set-user-feedback"
				})
			}
		}
	}
</script>

<style>
@import url("../../common/form.css");
</style>
