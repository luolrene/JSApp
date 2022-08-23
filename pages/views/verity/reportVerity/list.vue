<!-- 报告审核 -->
<template>
	<my-pagge :isShow="isShow">
		<my-list
			:obj="this"
			ref="tableRef"
			:tableData="tableData"
			:tableHeader="tableHeader"
			:buttonList="buttonList"
			:loadStatus="loadStatus" 
			:scrollTop="scrollTop">
		</my-list>
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				fromValiData: {
					pageSize: 10,
					pageNow: 1,
					isCheck:'1'
				},
				tableData: [],
				tableHeader:[
					{label:'项目名称',prop:'proName'},
					{label:'报告编号',prop:'reportNo'},
					{label:'客户名称',prop:'custName'},
					{label:'状态',prop:'statusName'}
				],
				buttonList:[
					{label:'审核',type:'primary',icon:'',click:'handleVerity'}
				],
				loadStatus: 'loadmore',
				scrollTop: 0
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.reportVerityApi.getReportEditQueryPageList(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
						switch (xdd.status) {
						  case '0':
						    xdd.statusName = '待编辑'
						    break
						  case '1_1':
						    xdd.statusName = '一审审核中'
						    break
						  case '1_2':
						    xdd.statusName = '二审审核中'
						    break
						  case '2':
						    xdd.statusName = '退回'
						    break
						  case '3':
						    xdd.statusName = '审核通过'
						    break
						  case '4':
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
			handleVerity(params){
				uni.navigateTo({
				    url: './verity?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			doSearch() {
				this.fromValiData.pageNow = 1
				this.tableData = []
				this.getListData()
			},
		},
		onLoad() {

		},
		onReady() {
			this.getListData()
		},
		onPullDownRefresh() {
			this.tableData = []
			this.fromValiData.pageNow = 1
			this.getListData()
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			if (this.tableData.length >= this.fromValiData.dataSum) {
				this.loadStatus = 'nomore';
			} else {
				this.loadStatus = 'loading';
				this.fromValiData.pageNow++
				this.getListData()
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style scoped lang="scss">

</style>
