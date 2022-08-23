<!-- 样品管理 -->
<template>
	<my-pagge :isShow="isShow">
		<my-list :obj="this" ref="tableRef" :tableData="tableData" :tableHeader="tableHeader"
			:loadStatus="loadStatus" :scrollTop="scrollTop">
		</my-list>
		<u-toast ref="uToast" />
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
					status: '0'
				},
				tableData: [],
				tableHeader: [{
						label: '样品编号',
						prop: 'sampNo'
					},
					{
						label: '点位编号',
						prop: 'custPointNo'
					},
					{
						label: '是否质控',
						prop: 'isZkName'
					},
					{
						label: '样品类型',
						prop: 'sampLxName'
					},
					{
						label: '检测指标',
						prop: 'targetName'
					},
				],
				loadStatus: 'loadmore',
				scrollTop: 0,

				params: {}
			}
		},
		methods: {
			getListData() {
				this.fromValiData.reportNo = this.params.reportNo
				this.$store.dispatch('setIsShow',true)
				this.$u.api.reportTaskApi.getSamplingTaskQuerySampNoPageListByTaskId(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
						xdd.isZkName = xdd.isZk === '0' ? '否' : '是'
					})
					this.tableData = this.tableData.concat(res.result.pageList)
					this.fromValiData.dataSum = res.result.dataSum
					if (this.tableData.length >= this.fromValiData.dataSum) {
						this.loadStatus = 'nomore';
					}
					uni.stopPullDownRefresh()
				})
			},
			doSearch() {
				this.fromValiData.pageNow = 1
				this.tableData = []
				this.getListData()
			},
		},
		onLoad(params) {
			if (params.params) {
				this.params = JSON.parse(params.params)
			}
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
