<template>
  <view class="">
    <u-cell-group>
    	<view class="common-title">·附件</view> 
    	<view style="flex-direction: column;width: 100%;padding:0 10rpx 30rpx 10rpx">
    		<u-row gutter="16" v-for="(item,index) in fileList" :key="index" @click="handlePreview(item,'detail')" style="line-height: 60rpx;">
    			<u-col span="11">
    				<view>{{index + 1}}. {{item.loadName}}</view>
    			</u-col>
    		</u-row>
    	</view>
    </u-cell-group>
    <l-file ref="lFile"></l-file>
    <u-gap height="20" bg-color="#F2F2F4"></u-gap>
  </view>
</template>

<script>
export default {
	props:{
		fileId:String,
		fileType:{
			type:String,
			default:null
		}
	},
  data () {
    return {
			fileList:[],
			host:this.$common.BaseUrl + this.$common.JS_Server
    }
  },
  methods: {
		//获取附件列表
		getFileList(){
			this.$u.api.commonApi.getFileQueryFileList({
				id: this.fileId,
				type: this.fileType
			}, this).then(res => {
				this.fileList = res.result
			})
		},
		handlePreview(params,type){
			let url = this.host + '/file/download?fileId=' +
			params.id + '&type=1' + '&token=' + this.$store.getters.userInfo.token
			
			this.$refs.lFile.download({url,
					type:'save', //选填，非save为临时下载
			    customName:params.loadName,
			    method: 'GET'})
			.then(path=>{
			  this.$refs.lFile.open(path);
			});
		},
  },
  mounted () {
		this.getFileList()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
::v-deep .t-toptips{
	padding: 0;
}
</style>
