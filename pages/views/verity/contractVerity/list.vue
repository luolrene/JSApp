<!-- 合同审核 -->
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
					{label:'项目名称',prop:'project'},
					{label:'项目板块',prop:'plateName'},
					{label:'项目类型',prop:'projectTypeName'},
					{label:'付款方式',prop:'payTypeName'},
					{label:'寄送方式',prop:'mailTypeName'},
					{label:'项目期限',prop:'proTerm'},
					{label:'合同金额',prop:'price'},
					{label:'合同状态',prop:'statusName'}
				],
				buttonList:[
					{label:'审核',type:'primary',icon:'',click:'handleVerity'},
					{label:'流程明细',type:'primary',icon:'',click:'handleProcess'},
				],
				loadStatus: 'loadmore',
				scrollTop: 0
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
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
			handleVerity(params){
				uni.navigateTo({
				    url: './verity?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			handleProcess(params){
				uni.navigateTo({
				    url: './process?params=' + encodeURIComponent(JSON.stringify(params))
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
