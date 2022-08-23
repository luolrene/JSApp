<!-- 跟进记录 -->
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
					{label: '联系人',prop: 'contactsName',isHead:true},
					{label: '跟进方式',prop: 'trackModeName'},
					{label: '跟进内容',prop: 'trackContent'},
					{label: '跟进结果',prop: 'trackResult'},
					{label: '拜访时间',prop: 'trackTime'},
					{label: '跟进人员',prop: 'trackPersonnelName'}
				],
				scrollTop: 0
			}
		},
		methods: {
			getListData() {
				this.fromValiData.custName = JSON.parse(JSON.stringify(this.params.name))
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientTrackRecordApi.getCrmTrackQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(item => {
					  if (item.trackMode === '1') {
					    item.trackModeName = '当面拜访'
					  }
					  if (item.trackMode === '2') {
					    item.trackModeName = '电话拜访'
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
