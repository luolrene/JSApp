<!-- 访客计划 -->
<template>
	<my-pagge :isShow="isShow">
		<my-list 
			:obj="this"
			ref="tableRef"
			:tableData="tableData"
			:tableHeader="tableHeader"
			:scrollTop="scrollTop">
		</my-list>
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
				fromValiData: {
					pageSize: 10,
					pageNow: 1
				},
				tableData: [],
				tableHeader: [
					{label: '访客计划名称',prop: 'name'},
					{label: '联系人名字',prop: 'contactsName'},
					{label: '拜访目的',prop: 'objective'},
					{label: '备注',prop: 'remarks'},
					{label: '跟进状态',prop: 'statusName'},
					{label: '执行时间',prop: 'executorTime'},
					{label: '执行人',prop: 'executorName'}
				],
				scrollTop: 0
			}
		},
		methods: {
			getListData() {
				this.fromValiData.custName = JSON.parse(JSON.stringify(this.params.name))
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientVisitorsToPlanApi.getCrmVisitorQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
					  if (xdd.status === '1') {
					    xdd.statusName = '未跟进'
					  }
					  if (xdd.status === '2') {
					    xdd.statusName = '已跟进'
					  }
					  if (xdd.status === '3') {
					    xdd.statusName = '延期'
					  }
					  if (xdd.status === '4') {
					    xdd.statusName = '取消'
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
