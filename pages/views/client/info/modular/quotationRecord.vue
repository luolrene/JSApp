<!-- 报价记录 -->
<template>
	<view>
		<my-pagge :isShow="isShow">
			<my-list 
				:obj="this"
				ref="tableRef"
				:tableData="tableData"
				:tableHeader="tableHeader"
				:scrollTop="scrollTop">
			</my-list>
		</my-pagge>
	</view>
</template>

<script>
	export default {
		props: {
			params: Object
		},
		data() {
			return {
				isShow:false,
				fromValiData: {
					pageSize: 10,
					pageNow: 1
				},
				tableData: [],
				tableHeader: [
					{label: '描述',prop: 'offerDescribe',isHead:true},
					{label: '金额',prop: 'offerAmountOfmoney'},
					{label: '状态',prop: 'offerStateName'},
					{label: '报价时间',prop: 'offerTime'},
					{label: '报价人',prop: 'offerUserName'}
				],
				scrollTop: 0
			}
		},
		methods: {
			getListData() {
				this.fromValiData.custName = JSON.parse(JSON.stringify(this.params.name))
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientQuotationRecordApi.getCrmOfferQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
					  switch (xdd.offerState) {
					    case '1':
					      xdd.offerStateName = '未记录'
					      break
					    case '2':
					      xdd.offerStateName = '已记录'
					      break
					    case '3':
					      xdd.offerStateName = '放弃'
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
			}
		},
		mounted() {
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
		created() {

		}
	}
</script>

<style scoped lang="scss">

</style>
