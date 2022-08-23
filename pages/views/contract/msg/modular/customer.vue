<template>
	<my-pagge :isShow="isShow">
		<u-cell-group style="margin-bottom: 20rpx;">
			<view class="common-title">·基本信息</view> 
			<u-cell-item title="客户名称" :arrow="false" :value="params.name" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="行业" :arrow="false" :value="params.industryName" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="备注" :arrow="false" :value="params.exp" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="所在地区" :arrow="false" :value="params.area" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="详细地址" :arrow="false" :value="params.address" :value-style="{color:'#333333'}"></u-cell-item>
		</u-cell-group>
		
		<view class="common-title" style="background-color: #FFFFFF;">·合同任务</view> 
		<my-list
			:obj="this"
			ref="tableRef"
			:tableData="tableData"
			:tableHeader="tableHeader"
			:loadStatus="loadStatus"
			:scrollTop="scrollTop"
			@handleDetails="handleDetails">
		</my-list>
	</my-pagge>
</template>

<script>
export default {
	props:{
		custId: ''
	},
  data () {
    return {
			isShow:false,
			fromValiData: {
			  pageSize: 10,
			  pageNow: 1
			},
			tableData: [],
			tableHeader: [{
					label: '项目名称',
					prop: 'project'
				},
				{
					label: '合同编号',
					prop: 'contNo'
				},
				{
					label: '项目板块',
					prop: 'plateName'
				},
				{
					label: '项目类型',
					prop: 'projectTypeName'
				},
				{
					label: '客户名称',
					prop: 'custName'
				},
				{
					label: '付款方式',
					prop: 'payTypeName'
				},
				{
					label: '寄送方式',
					prop: 'mailTypeName'
				},
				{
					label: '项目期限',
					prop: 'proTerm'
				},
				{
					label: '合同状态',
					prop: 'statusName'
				}
			],
			loadStatus: 'loadmore',
			scrollTop: 0,
			
			params: {},
    }
  },
  methods: {
		getDetails () {
		  let ids = {}
		  ids.custId = this.custId
		  this.$u.api.clientInfoApi.getCustQueryCustomerById(ids,this).then(res => {
				if(res.result){
					this.params = res.result
				}
		  })
		},
		getListData() {
			this.$store.dispatch('setIsShow',true)
			this.fromValiData.custId = this.custId
			this.$u.api.msgApi.getContractQueryPageData(this.fromValiData, this).then(res => {
				res.result.pageList.forEach(xdd => {
					switch (xdd.status) {
						case '00':
							xdd.statusName = '初始'
							break
						case '01':
							xdd.statusName = '审核中'
							break
						case '02':
							xdd.statusName = '审核通过'
							break
						case '03':
							xdd.statusName = '审核退回'
							break
						case '04':
							xdd.statusName = '放弃'
							break
						case '05':
							xdd.statusName = '已完成'
							break
						case '06':
							xdd.statusName = '启动'
							break
						case '07':
							xdd.statusName = '挂起'
							break
					}
				})
				this.tableData = this.tableData.concat(res.result.pageList)
				this.fromValiData.dataSum = res.result.dataSum
				if (this.tableData.length >= this.fromValiData.dataSum) {
					this.loadStatus = 'nomore';
				}
				uni.stopPullDownRefresh()
			})
		},
		handleDetails(params){
			uni.redirectTo({
			    url: './detail?params=' + encodeURIComponent(JSON.stringify(params))
			});
		}
  },
  mounted () {
		this.getDetails()
		this.getListData()
		
		let that = this
		uni.$on('onReachBottom',function(data){
			that.loadStatus = 'loading';
			if (that.tableData.length >= that.fromValiData.dataSum) {
				that.loadStatus = 'nomore';
			} else {
				that.loadStatus = 'loading';
				that.fromValiData.pageNow++
				that.getListData()
			}
		})
  },
  created () {

  },
}
</script>

<style scoped lang="scss">
.u-cell{
	padding: 14rpx 30rpx;
}
</style>
