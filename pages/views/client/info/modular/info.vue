<!-- 客户信息 -->
<template>
	<my-pagge :isShow="isShow">
		<u-cell-group style="margin-bottom: 20rpx;">
			<view class="common-title">·基本信息</view> 
			<u-cell-item title="客户名称" :arrow="false" :value="params.name" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="客户性质" :arrow="false" :value="params.typeName" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="社会统一信用代码" :arrow="false" :value="params.properlyCode" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="上级公司名称" :arrow="false" :value="params.parentCustomerName" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="所在地区" :arrow="false" :value="params.province + '-' + params.city + '-' + params.area" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="详细地址" :arrow="false" :value="params.address" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="客户状态" :arrow="false" :value="params.customerTypeName" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="客户级别" :arrow="false" :value="params.importantCustomersName" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="行业" :arrow="false" :value="params.industryName" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="创建时间" :arrow="false" :value="params.createTime" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="备注" :arrow="false" :value="params.exp" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="合同总额" :arrow="false" :value="params.contMoney" :value-style="{color:'#333333'}"></u-cell-item>
			<u-cell-item title="生产总额" :arrow="false" :value="params.factMoney" :value-style="{color:'#333333'}"></u-cell-item>
		</u-cell-group>
		
		<view class="common-title" style="background-color: #FFFFFF;">·投标信息</view> 
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
		params: Object
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
					prop: 'opportunityName'
				},
				{
					label: '项目限价',
					prop: 'fixedPrice'
				},
				{
					label: '开标时间',
					prop: 'startTime'
				},
				{
					label: '项目节点',
					prop: 'projectNodeName'
				},
				{
					label: '创建人',
					prop: 'createUserName'
				},
				{
					label: '招投标专员',
					prop: 'sceneName'
				}
			],
			loadStatus: 'loadmore',
			scrollTop: 0,
    }
  },
  methods: {
		getListData() {
			this.$store.dispatch('setIsShow',true)
			this.fromValiData.custId = this.params.id
			this.$u.api.clientBidApi.getCrmBiddingQueryPageData(this.fromValiData, this).then(res => {
				res.result.pageList.forEach(xdd => {
					switch (xdd.projectNode) {
					  case '0':
					    xdd.projectNodeName = '编辑'
					    break
					  case '1':
					    xdd.projectNodeName = '退回'
					    break
					  case '2':
					    xdd.projectNodeName = '审核中'
					    break
					  case '3':
					    xdd.projectNodeName = '文件编制'
					    break
					  case '4':
					    xdd.projectNodeName = '现场投标'
					    break
					  case '5':
					    xdd.projectNodeName = '已完成'
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
		getCustQueryMoney(){
			this.$u.api.clientInfoApi.getCustQueryMoney({ custId: this.params.id },this).then(res=>{
				this.params.contMoney = res.result.contMoney
				this.params.factMoney = res.result.factMoney
				this.$forceUpdate()
			})
		}
  },
  mounted () {
		this.getListData()
		this.getCustQueryMoney()
		
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
		
		switch (this.params.importantCustomers) {
		  case '1':
		    this.params.importantCustomersName = '普通客户'
		    break
		  case '2':
		    this.params.importantCustomersName = '重点客户'
		    break
		  case '3':
		    this.params.importantCustomersName = 'VIP客户'
		    break
		}
		switch (this.params.customerType) {
		  case '1':
		    this.params.customerTypeName = '已有订单'
		    break
		  case '2':
		    this.params.customerTypeName = '从无订单'
		    break
		  case '3':
		    this.params.customerTypeName = '订单中断'
		    break
		}
		switch (this.params.type) {
		  case '1':
		    this.params.typeName = '个人'
		    break
		  case '2':
		    this.params.typeName = '政府'
		    break
		  case '3':
		    this.params.typeName = '事业单位'
		    break
		  case '4':
		    this.params.typeName = '私有企业'
		    break
		  case '5':
		    this.params.typeName = '国有企业'
		    break
		  case '6':
		    this.params.typeName = '外资企业'
		    break
		  case '7':
		    this.params.typeName = '合资企业'
		    break
		}
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
