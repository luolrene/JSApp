<template>
  <my-pagge :isShow="isShow" style="background-color: #FFFFFF;padding: 0 20rpx 60rpx 20rpx;">
		<u-cell-group style="margin-bottom: 20rpx;">
			<view class="common-title">·附件上传</view> 
			<my-upload :fileId="this.fileId" @upSuccess="upSuccess" ref="myUpload" style="margin-left: 20rpx;"></my-upload>
		</u-cell-group>
		<u-cell-group>
			<view class="common-title">·已上传附件列表</view>
			<view style="flex-direction: column;width: 100%;">
				<u-row gutter="16" v-for="(item,index) in fileList" :key="index" style="line-height: 70rpx;">
					<u-col span="11">
						<view @click="handlePreview(item,'detail')">{{index + 1}}. {{item.loadName}}</view>
					</u-col>
					<u-col span="1">
						<u-icon name="close" size="16" @click="handlePreview(item,'del')"></u-icon>
					</u-col>
				</u-row>
			</view>
		</u-cell-group>
  </my-pagge>
</template>

<script>
export default {
  data () {
    return {
			isShow:false,
			fileId:'',
			fileType:'1',
			fileList:[]
    }
  },
  methods: {
		handlePreview(params, type) {
			if (type === 'detail') {
				uni.navigateTo({
					url: './my-preview?params=' + JSON.stringify(params) + '&that=' + this
				})
			} else if (type === 'del') {
				let that = this
				uni.showModal({
					title: '提示',
					content: '此操作将删除附件，是否继续？',
					success(res) {
						if (res.confirm) {
							that.$u.api.commonApi.getFileDelFile({
								fileId: params.id,
								type: that.fileType
							}, that).then(res => {
								uni.showToast({
									title: '删除成功',
									icon: 'none'
								})
								that.getFileList()
							})
						}
					}
				})
			}
		},
		upSuccess(res) {
			if (res.code === 0) {
				uni.showToast({
					title: '上传成功',
					icon: 'none'
				})
				this.getFileList()
			}
		},
		//获取附件列表
		getFileList() {
			this.$u.api.commonApi.getFileQueryFileList({
				id: this.fileId,
				type: this.fileType
			}, this).then(res => {
				this.fileList = res.result
			})
		}
  },
  onLoad (params) {
		if(params.fileId){
			this.fileId = params.fileId
		}
		if(params.fileType){
			this.fileType = params.fileType
		}
		
  	this.getFileList()
  },
  onReady () {
  	
  }
}
</script>

<style scoped lang="scss">

</style>
