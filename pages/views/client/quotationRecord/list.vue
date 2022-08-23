<!-- 报价记录 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入客户名称"
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
					{type:'input',name:'操作人',prop:'offerUserName'},
					{type:'select',name:'状态',prop:'offerState',data:[
						{ id: '1', name: '待审批' },
						{ id: '2', name: '通过' },
						{ id: '3', name: '放弃' }
					],active:null},
					{type:'select',name:'归属',prop:'other',data:[
						{ name: '我的', id: '2' },
						{ name: '下属', id: '3' }
					],active:null}
				],
				tableData: [],
				tableHeader:[
					{label:'客户名称',prop:'custName',isHead:true},
					{label:'描述',prop:'offerDescribe'},
					{label:'金额',prop:'offerAmountOfmoney'},
					{label:'状态',prop:'offerStateName'},
					{label:'报价时间',prop:'offerTime'},
					{label:'操作人',prop:'offerUserName'}
				],
				buttonList:[
					{label:'附件上传',type:'primary',icon:'\uec23',click:'handleUpload'},
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientQuotationRecordApi.getCrmOfferQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
					  switch (xdd.offerState) {
					    case '1':
					      xdd.offerStateName = '待审批'
					      break
					    case '2':
					      xdd.offerStateName = '通过'
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
			},
			// 搜索
			handleCustom(e){
				this.fromValiData.custName = e
				this.doSearch()
			},
			handleCopy(params){
				let that = this
				uni.showModal({
					title:'提示',
					content:'此操作将复制本条数据，是否继续？',
					success(res) {
						if(res.confirm){
							params.id = null
							that.$u.api.clientTrackRecordApi.getCrmTrackAddOrModify(params,that).then(res=>{
								that.$refs.tableRef.$refs.uToast.show({
									title: '复制成功',
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
			handleDelete(row){
				let that = this
				uni.showModal({
					title:'提示',
					content:'此操作将永久删除该数据，是否继续？',
					success(res) {
						if(res.confirm){
							that.$u.api.clientQuotationRecordApi.getCrmOfferDelCrmOfferIds({ids:row.id},that).then(res=>{
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
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './edit'
			})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style scoped lang="scss">

</style>
