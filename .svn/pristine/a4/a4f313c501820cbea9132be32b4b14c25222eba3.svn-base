<script>
	export default {
		onLaunch: function() {  
			// #ifdef APP-PLUS
			const _self = this;
			const _handlePush = message => {
				uni.navigateTo({
					url:'/pages/views/home/push_list'
				})
			};  
			plus.push.addEventListener('click', _handlePush);
			plus.push.addEventListener('receive', _handlePush);
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "./static/common.css";
	@font-face {
	  font-family: 'iconfont';
	  src: url('static/icon/iconfont.ttf') format('truetype');
	}
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	page {
		background-color: #F2F2F4;
	}
	/*每个页面公共css */
</style>
