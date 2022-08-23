<!-- 联系人 -->
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
					{label: '联系人姓名',prop: 'name'},
					{label: '联系人电话',prop: 'mobile'},
					{label: '性别',prop: 'sex'},
					{label: '邮箱',prop: 'email'},
					{label: '详细地址',prop: 'addressDetailed'}
				],
				scrollTop: 0
			}
		},
		methods: {
			getListData() {
				this.fromValiData.custId = this.params.id
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientContactManageApi.getCustContactsQueryPageData(this.fromValiData, this).then(res => {
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
