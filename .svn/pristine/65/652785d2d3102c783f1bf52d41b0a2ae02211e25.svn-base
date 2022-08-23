<!-- 客户关系 -->
<template>
	<my-pagge :isShow="isShow">
		<view class="common-title" style="background-color: #FFFFFF;">·上级客户</view> 
		<my-list
			:obj="this"
			ref="tableRef"
			:tableData="tableDataA"
			:tableHeader="tableHeader"
			:scrollTop="scrollTop"
			:isLoadmore="false">
		</my-list>
		<view class="common-title" style="background-color: #FFFFFF;">·下级客户</view>
		<my-list
			:obj="this"
			ref="tableRef"
			:tableData="tableDataB"
			:tableHeader="tableHeader"
			:scrollTop="scrollTop"
			:isLoadmore="false">
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
			  pageSize: 999,
			  pageNow: 1
			},
			tableHeader: [{
					label: '客户名称',
					prop: 'name'
				},
				{
					label: '客户行业',
					prop: 'industryName'
				},
				{
					label: '省-市-区',
					prop: 'cityCode'
				},
				{
					label: '客户类别',
					prop: 'typeName'
				},
				{
					label: '创建时间',
					prop: 'createTime'
				}
			],
			tableDataA: [],
			tableDataB: [],
			loadStatus: 'loadmore',
			scrollTop: 0,
    }
  },
  methods: {
		getListData() {
			this.$store.dispatch('setIsShow',true)
			this.fromValiData.custId = this.params.id
			this.$u.api.clientInfoApi.getCustRelationship(this.fromValiData, this).then(res => {
				res.result.Upper.forEach(xdd => {
				  xdd.cityCode = xdd.province + '-' + xdd.city + '-' + xdd.area
				  if (xdd.cityCode === 'null-null-null') {
				    xdd.cityCode = '/'
				  }
				})
				res.result.Lower.forEach(xdd => {
				  xdd.cityCode = xdd.province + '-' + xdd.city + '-' + xdd.area
				  if (xdd.cityCode === 'null-null-null') {
				    xdd.cityCode = '/'
				  }
				})
				res.result.Upper.forEach(xdd => {
				  if (xdd.type === '1') {
				    xdd.typeName = '个人'
				  }
				  if (xdd.type === '2') {
				    xdd.typeName = '政府'
				  }
				  if (xdd.type === '3') {
				    xdd.typeName = '事业单位'
				  }
				  if (xdd.type === '4') {
				    xdd.typeName = '私企'
				  }
				  if (xdd.type === '5') {
				    xdd.typeName = '国企'
				  }
				  if (xdd.type === '6') {
				    xdd.typeName = '外企'
				  }
				})
				res.result.Lower.forEach(xdd => {
				  if (xdd.type === '1') {
				    xdd.typeName = '个人'
				  }
				  if (xdd.type === '2') {
				    xdd.typeName = '政府'
				  }
				  if (xdd.type === '3') {
				    xdd.typeName = '事业单位'
				  }
				  if (xdd.type === '4') {
				    xdd.typeName = '私企'
				  }
				  if (xdd.type === '5') {
				    xdd.typeName = '国企'
				  }
				  if (xdd.type === '6') {
				    xdd.typeName = '外企'
				  }
				})
				
				// 上级
				this.tableDataA = res.result.Upper
				// 下级
				this.tableDataB = res.result.Lower
			})
		},
  },
  mounted () {
		this.fromValiData.id = this.params.id
		this.fromValiData.parentCustomer = this.params.parentCustomer
		this.getListData()
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
