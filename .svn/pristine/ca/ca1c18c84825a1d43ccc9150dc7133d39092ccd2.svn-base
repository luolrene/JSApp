<!-- 合同信息 -->
<template>
	<my-pagge :isShow="isShow">
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
import { keepTwoDecimalFull } from '../../../../utils/public.js'
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
					prop: 'project'
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
					label: '合同金额',
					prop: 'price'
				},
				{
					label: '生产总额',
					prop: 'factMoney'
				},
				{
					label: '合同状态',
					prop: 'statusName'
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
			this.$u.api.msgApi.getContractQueryPageData(this.fromValiData, this).then(res => {
				res.result.pageList.forEach(xdd => {
				  switch (xdd.status) {
				    case '00':
				      xdd.statusName = '草稿'
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
				      xdd.statusName = '进行中'
				      break
				    case '07':
				      xdd.statusName = '变更审核'
				      break
				  }
				  xdd.factMoney = xdd.factMoney === null ? 0 : xdd.factMoney
				  xdd.factMoney = keepTwoDecimalFull(xdd.factMoney)
				  xdd.price = keepTwoDecimalFull(xdd.price)
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
			uni.navigateTo({
				url: '../../contract/msg/detail?params=' + encodeURIComponent(JSON.stringify(params))
			});
		}
  },
  mounted () {
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
