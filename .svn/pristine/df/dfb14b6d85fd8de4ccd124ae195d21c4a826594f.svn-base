<template>
	<view>
		<view class="addClass" @click="addRemark">
			<u-icon size="30" name="plus" color="#4D72E4" style="margin-right: 4rpx;"></u-icon>
			当前节点添加日志
		</view>
		<my-pagge :isShow="isShow" class="nodeListClass">	
		  <u-time-line style="margin:0 40rpx;padding-top: 20rpx;">
		  		<u-time-line-item nodeTop="-2" v-for="(item,index) in assembleData" :key="index">
		  			<!-- 此处自定义了左边内容，用一个图标替代 -->
		  			<template v-slot:node>
		  				<view class="u-node nodeIcon">
		  					<!-- 此处为uView的icon组件 -->
		  					{{index + 1}}
		  				</view>
		  			</template>
		  			<template v-slot:content>
		  				<view class="title" :class="{isNowStepClass:item.isNowStep === '1'}">{{item.name}} <view v-if="item.isNowStep === '1'">（当前节点）</view> </view>
		  				<view class="time">{{item.jdTime}}</view>
		  				<view class="userList" v-for="xdd in item.operList" :key="xdd.operMobile">
		  					<span v-if="xdd.type !== null" style="margin-right: 10rpx;">{{xdd.type}}:</span>
		  					<span v-if="xdd.operName !== null">{{xdd.operName}} {{xdd.operMobile}}</span>
		  					<span v-else>无</span>
		  				</view>
							<!-- 备注信息 -->
							<block v-if="item.logData.length > 0">
								<view class="userList">备注信息：
									<span style="color: #4D72E4;text-decoration: underline;" v-show="!item.isLogShow" @click="item.isLogShow = true">显示</span>
									<span style="color: #4D72E4;text-decoration: underline;" v-show="item.isLogShow" @click="item.isLogShow = false">隐藏</span>
								</view>
								<view class="remark" v-show="item.isLogShow">
									<view v-for="(xdd,index2) in item.logData" :key="xdd.id" style="margin-bottom: 20rpx;">
										<view class="remarkTitle">
											<span>{{index2 + 1}}、{{xdd.creater}}</span><span>{{xdd.createTime}}</span>
										</view>
										<view>备注内容：{{xdd.text}}</view>
									</view>
								</view>
							</block>
		  			</template>
		  		</u-time-line-item>
		  	</u-time-line>
				
				<!-- 添加节点日志 -->
				<u-popup v-model="remarkShow" mode="center" :mask-close-able="false" :border-radius="20" :closeable="true" width="80%">
					<view style="padding: 40rpx;">
						<u-form :model="fromValiData" ref="fromValiData" :error-type="errorType" :label-width='130' class="my-edit">
							<u-form-item label="节点名称:">
								<my-form name="input" type="input" v-model="fromValiData.jdNoName" placeholder="" :disabled="true"></my-form>
							</u-form-item>
							<u-form-item label="备注:" prop="text">
								<my-form name="input" type="input" v-model="fromValiData.text" placeholder="请输入备注内容"></my-form>
							</u-form-item>
						</u-form>
						
						<view style="display: flex;margin-top: 20rpx;">
							<u-button size="mini" @click="remarkShow = false">取消</u-button>
							<u-button type="primary" size="mini" @click="onSubmit">确认</u-button>
						</view>
					</view>
				</u-popup>
		</my-pagge>
		<u-toast ref="uToast" :duration="1000"/>
	</view>
  
</template>

<script>
export default {
  data () {
    return {
			isShow:false,
			remarkShow:false,
			params:{},
			active:0,
			fromValiData: {
				text:''
			},
			errorType: ['message'],
			
			assembleData: [],
    }
  },
  methods: {
		onSubmit(){
			if(this.fromValiData.text === ''){
				this.$refs.uToast.show({
					title: '请输入备注内容',
					type: 'warning',
				})
				return
			}
			
			this.fromValiData.reportNo = this.params.reportNo
			this.$u.api.nodeDefendApi.getReportTaskLogAdd(this.fromValiData, this).then(res=>{
				this.$refs.uToast.show({
					title: '添加成功',
					type: 'success',
				})
				this.getNodeData()
				this.remarkShow = false
			})
		},
		getListData(jdData, logData){
			let ids = {}
			ids.reportNo = this.params.reportNo
			this.$u.api.nodeDefendApi.getReportJdQueryTaskJdShow(ids, this).then(res => {
				jdData.forEach(xdd => {
				  xdd.logData = []
				  xdd.isLogShow = false
				  if (res.result && res.result.length > 0) {
				    this.active = res.result.length - 1
				    res.result.forEach(arc => {
				      if (xdd.id === arc.jdNo) {
				        xdd.jdNo = arc.jdNo
				        xdd.isNowStep = arc.isNowStep
				        xdd.jdTime = arc.jdTime
				        xdd.operList = arc.operList
				      }
				      if (xdd.isNowStep === '1') {
				        this.fromValiData.jdNo = xdd.jdNo
				        this.fromValiData.jdNoName = xdd.name
				      }
				    })
				  }
				  if (logData && logData.length > 0) {
				    logData.forEach(arc => {
				      if (xdd.id === arc.jdNo) {
				        xdd.logData.push(arc)
				      }
				    })
				  }
				})
				this.assembleData = jdData
			})
		},
		getNodeData () {
			let ids = {}
			ids.pageNow = 1
			ids.pageSize = 99999
			ids.reportNo = this.params.reportNo
			this.$u.api.commonApi.getSysQueryDict({'type': 'RWJD'}, this).then(res => {
				this.projectTypeData = res.result
				
				this.$u.api.nodeDefendApi.getReportTaskLogQueryPageData(ids, this).then(res2 => {
					this.getListData(res.result, res2.result.pageList)
				})
			})
		},
		addRemark(){
			this.remarkShow = true
			this.fromValiData.text = ''
		},
  },
  onLoad (params) {
		if (params.params) {
			this.params = JSON.parse(params.params)
		}
		this.getNodeData()
  },
  onReady () {
		
  }
}
</script>

<style scoped lang="scss">
	.addClass{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx 0;
		background-color: #ffffff;
		margin: 20rpx;
		border-radius: 60rpx;
		border:1px solid #92A9EF
	}
	.nodeListClass{
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding-bottom: 60rpx;
	}
	.isNowStepClass{
		font-weight: 700;
	}
	.nodeIcon{
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 40rpx;
		font-weight: 700;
		color:#409EFF;
		border: 2px solid #409EFF;
		border-radius: 50%;
	}
	.title{
		font-size: 30rpx;color: #333333;margin-bottom: 14rpx;display: flex;
	}
	.time{
		font-size: 26rpx;color: #666666;margin-bottom: 12rpx;
	}
	.userList{
		font-size: 26rpx;color: #666666;margin-bottom: 10rpx;
	}
	
	.remark{
		border: 1px solid #F2F2F4;border-radius: 20rpx;padding: 20rpx 20rpx 10rpx 20rpx;
	}
	.remarkTitle{
		display: flex;justify-content: space-between;margin-bottom: 4rpx;font-size: 26rpx;
	}
</style>
