<script>
	export default {
		onLaunch: function() {
			this.lib.Network.on();
			this.User.__init();
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");
	@import url("./common/animate.css");
	@import url("./static/font/iconfont.css");
	@import url("./common/common.css");
</style>
