<!-- 销售机会 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入销售机会名称"
		@handleCustom="handleCustom"></my-search>
		<my-pagge :isShow="isShow">
			<my-list
				:obj="this"
				ref="tableRef"
				:tableData="tableData"
				:tableHeader="tableHeader"
				:buttonList="buttonList"
				:loadStatus="loadStatus" 
				:scrollTop="scrollTop"
				@handleDetails="handleDetails">
			</my-list>
		</my-pagge>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				fromValiData: {
					pageSize: 10,
					pageNow: 1
				},
				searchData:[
					{type:'date',name:'开始日期',prop:'startTime',isShow:false},
					{type:'date',name:'结束日期',prop:'endTime',isShow:false},
					{type:'input',name:'客户名称',prop:'custname'},
					{type:'input',name:'负责人',prop:'executorName'},
					{type:'select',name:'销售阶段',prop:'stage',data:[
						{ name: '发现需求', id: '1' },
						{ name: '确认需求', id: '2' },
						{ name: '商务谈判', id: '3' },
						{ name: '合同签订', id: '4' },
						{ name: '输单', id: '5' }
					],active:null},
					{type:'select',name:'是否重点',prop:'tasklev',data:[
						{ name: '否', id: '1' },
						{ name: '是', id: '3' }
					],active:null},
					{type:'select',name:'归属',prop:'other',data:[
						{ name: '我的', id: '2' },
						{ name: '下属的', id: '3' }
					],active:null}
				],
				tableData: [],
				tableHeader:[
					{label:'销售机会名称',prop:'opportunityName'},
					{label:'客户名称',prop:'custName'},
					{label:'联系人',prop:'contactsName'},
					{label:'销售机会编号',prop:'opportunityId'},
					{label:'销售阶段',prop:'stageName'},
					{label:'预计金额',prop:'estimatedAmount'},
					{label:'创建时间',prop:'createTime'},
					{label:'负责人',prop:'executorName'}
				],
				buttonList:[
					{label:'附件上传',type:'primary',icon:'\uec23',click:'handleUpload'},
					{label:'编辑',type:'primary',icon:'\ueca2',click:'handleEdit'},
					{label:'删除',type:'error',icon:'\uec83',click:'handleDelete'}
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientSalesLeadsApi.getCrmSaleOpportunityQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
					  if (xdd.stage === '1') {
					    xdd.stageName = '发现需求'
					  } else if (xdd.stage === '2') {
					    xdd.stageName = '确认需求'
					  } else if (xdd.stage === '3') {
					    xdd.stageName = '商务谈判'
					  } else if (xdd.stage === '4') {
					    xdd.stageName = '合同签订'
					  } else if (xdd.stage === '5') {
					    xdd.stageName = '输单'
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
			// 搜索
			handleCustom(e){
				this.fromValiData.opportunityName = e
				this.doSearch()
			},
			handleDelete(row){
				let that = this
				uni.showModal({
					title:'提示',
					content:'此操作将永久删除该数据，是否继续？',
					success(res) {
						if(res.confirm){
							that.$u.api.clientSalesLeadsApi.getCrmSaleOpportunityDelCrmSaleOpportunityIds({ids:row.id},that).then(res=>{
								that.$refs.tableRef.$refs.uToast.show({
									title: '删除成功',
									type: 'success',
								})
								that.doSearch()
							})
						}
					}
				})
			},
			handleUpload(params){
				uni.navigateTo({
					url:'../../common/upload?fileId=' + params.id + '&fileType="4"'
				})
			},
			handleEdit(params){
				uni.navigateTo({
				    url: './edit?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			handleDetails(params){
				let ids = {}
				ids.id = params.custId
				this.$u.api.clientInfoApi.getCustGetCustomerById(ids,this).then(res=>{
					uni.navigateTo({
						url:'../info/detail?params=' + encodeURIComponent(JSON.stringify(res.result))
					})
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
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:'./edit'
			})
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
