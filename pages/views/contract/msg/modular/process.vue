<template>
	<my-pagge :isShow="isShow">
		<view style="background-color: #FFFFFF;">
			<view class="common-title">·当前流程</view> 
			<u-time-line style="margin:0 40rpx;padding-top: 20rpx;">
				<u-time-line-item nodeTop="6" v-for="item in checkLogList" :key="item.id">
					<!-- 此处自定义了左边内容，用一个图标替代 -->
					<template v-slot:node>
						<view class="u-node" :style="{background: item.optinColor}">
							<!-- 此处为uView的icon组件 -->
							<u-icon name="tags" color="#fff" :size="24"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view class="u-order-title">步骤{{item.step}} <span :style="{color:item.optinColor}">{{item.optionName}}</span></view>
						<view class="u-order-desc">
							<view>
								{{item.oper}} {{item.operMobile}}
							</view>
						</view>
						<view class="u-order-time">{{item.operTime}}</view>
					</template>
				</u-time-line-item>
			</u-time-line>
			
			<u-gap height="20" bg-color="#F2F2F4"></u-gap>
			
			<view class="common-title">·总流程</view> 
			<u-steps :list="stepList" :current="stepCurrent" direction="column" mode="number" style="margin:0 20rpx;"></u-steps>
			<u-gap height="20" bg-color="#F2F2F4"></u-gap>
		</view>
	</my-pagge>
</template>

<script>
	export default {
		props: {
			params: Object
		},
		data() {
			return {
				isShow:false,
				stepList: [],
				checkLogList:[],
				stepCurrent: -1
			}
		},
		methods: {
			getListData() {
				this.stepList = []
				this.$store.dispatch('setIsShow',true)
				this.$u.api.exmProcessApi.getPathQueryPathItems({
					mainId: this.params.checkPath
				}, this).then(res => {
					res.result.forEach(xdd=>{
						this.stepList.push({
							name: xdd.operName
						})
					})
					this.stepList.push({name:'流程结束'})
				})
			},
			getLogData() {
				this.$u.api.contractVerityApi.getCheckTaskQueryLogs({
					taskId: this.params.checkTask
				}, this).then(res => {
					res.result.logList.forEach(xdd => {
					  if (xdd.option === '1') {
					    xdd.optionName = '同意'
					    xdd.optinColor = '#01AB91'
					  } else {
					    xdd.optionName = '拒绝'
					    xdd.optinColor = '#FF798D'
					  }
					})
					
					this.checkLogList = res.result.logList
					this.stepCurrent = res.result.step - 1
					if(this.params.checkTaskStatus === '1'){
						this.stepCurrent = res.result.step
					}else{
						this.stepCurrent = res.result.step - 2
					}
				})
			},
		},
		mounted() {
			console.log(this.params)
			this.getListData()
			this.getLogData()
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
	.u-node {
		width: 40rpx;
		height: 40rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 30rpx;
		display: flex;
	}
	.u-order-title span{
		color: #19be6b;
		font-size: 30rpx;
		margin-left: 40rpx;
	}
	
	

	.u-order-desc {
		color: #666666;
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: #999999;
		font-size: 26rpx;
	}
</style>
