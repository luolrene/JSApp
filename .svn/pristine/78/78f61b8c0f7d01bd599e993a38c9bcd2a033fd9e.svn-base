<template>
	<view>
		<web-view :src="src"></web-view>
		<!-- <video id="myVideo" src="http://www.aecccloud.com:45005/V2/API/aecc-common-v2/storage0/QINGDAOYUNYING/2020/4/26/b5a9912a-9053-4d6d-98be-6ca48ad0762c.mp4?X-Token=IE1HIRF3huCPuIbi%2B%2Fom1snK1O%2BC2kQJwJpHWMl56gB65FljcO5TFeoRz71MraIURU%2Fip9Gf2etQDD4GzcfNZcZjGFMQQ43UZfz8JR%2Benb%2FrC8tre9IHz6McZvvM7WhlNWxeo9ZXArgjuQzBhtdw7m4RpqA%2F%2BdfaWcgMfoxH224%3D"
		 enable-danmu danmu-btn controls poster="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/poster.png"></video> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				windowWidth:0,
				fromValiData:{},
				host:this.$common.BaseUrl + this.$common.JS_Server
			}
		},
		methods:{
		},
		// #ifdef H5
		mounted() { 
		},
		// #endif
		// #ifndef H5
		onReady() {
		},
		// #endif
		onLoad(params) {
			let base64= require('../../../../static/js/base64.js').Base64;
			if (params.params) {
				this.fromValiData = JSON.parse(params.params)
				this.src = this.$common.FILE_Server + encodeURIComponent(base64.encode(this.host + '/file/download?fileId=' +
				 this.fromValiData.id + '&type=1' + '&token=' + this.$store.getters.userInfo.token + '&fullfilename=' + this.fromValiData.saveName))  
			}
		},
		onNavigationBarButtonTap() {
			let url = this.host + '/file/download?fileId=' +
			this.fromValiData.id + '&type=1' + '&token=' + this.$store.getters.userInfo.token
			let pages = getCurrentPages() // 当前页面
			let beforePage = pages[pages.length - 2] //上一页

			// #ifdef H5
				beforePage.$refs.myUpload.$refs.lFile.download({url})
				.then(path=>{
				  beforePage.$refs.myUpload.$refs.lFile.open(path);
				});
			// #endif
			
			// #ifndef H5
			beforePage.$vm.$refs.myUpload.$refs.lFile.download({url,
					type:'save', //选填，非save为临时下载
			    customName:this.fromValiData.loadName,
			    method: 'GET'})
			.then(path=>{
			  beforePage.$vm.$refs.myUpload.$refs.lFile.open(path);
			});
			// #endif
		},
		
	}
</script>

<style>
	.area-label {
		font-size: 28rpx;
		color: #000000;
		font-family: PingFangBold;
	}
	.close{
		width: 20rpx;
		height: 20rpx;
		left: 138rpx;
		top: -174rpx;
		position:relative;
	}
	.uni-uploader__file {
		height: 170rpx;
		margin-bottom: 0rpx;
	}
	.uni-uploader {
		min-height: 82rpx;
	}
	.file-empty {
		font-family: pingFangSCRegular;
		font-size: 28rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 82rpx;
	}
	.uni-list:after {
	    position: absolute;
	    z-index: 10;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    height: 0.5px;
	    content: '';
	    -webkit-transform: scaleY(0.99);
	    transform: scaleY(0.99);
	    /* background-color: #c8c7cc; */
		background-color: #CCCCCC;
	}
	.uni-list::before {
	    position: absolute;
	    z-index: 10;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    height: 0.5px;
	    content: '';
		-webkit-transform: scaleY(0.99);
		transform: scaleY(0.99);
	    /* background-color: #c8c7cc; */
		background-color: #CCCCCC;
	}
	.list-card-prop {
		font-size: 28rpx;
	}
	.remove-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
