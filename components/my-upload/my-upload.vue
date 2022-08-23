<template>
  <view>
		<l-file ref="lFile" @up-success="upSuccess"></l-file>
    <u-button size="mini" type="primary" @click="handleUpload">上传附件</u-button>
  </view>
</template>

<script>
export default {
	props:{
		fileId:'',
		fileType:{
			type:String,
			default:'1'
		}
	},
  data () {
    return {
			host:this.$common.BaseUrl + this.$common.JS_Server
    }
  },
  methods: {
		handleUpload() {
			this.$refs.lFile.upload({
				// #ifdef APP-PLUS
				//（app端必传）nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
				currentWebview: this.$mp.page.$getAppWebview(),
				// #endif
				//替换为你的上传接口地址
				url: this.$common.BaseUrl + this.$common.JS_Server + '/file/upload',
				// 服务端接收附件的key
				name: 'file',
				//根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
				header: {
					token: this.$store.getters.userInfo.token
				},
				'id': this.fileId,
				'type': this.fileType,
			});
		},
		upSuccess(res){
			this.$emit('upSuccess',res)
		},
  },
  onLoad () {
  	
  },
  onReady () {
  	
  }
}
</script>

<style scoped lang="scss">

</style>
