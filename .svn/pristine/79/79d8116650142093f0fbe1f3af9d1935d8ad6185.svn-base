<!-- 访客计划 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入计划名称"
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
					{type:'input',name:'联系人',prop:'contactsName'},
					{type:'input',name:'执行人',prop:'executorName'},
					{type:'select',name:'跟进状态',prop:'status',data:[
						{ name: '未跟进', id: '1' },
						{ name: '已跟进', id: '2' },
						{ name: '延期', id: '3' },
						{ name: '取消', id: '4' }
					],active:null},
					{type:'select',name:'归属',prop:'track',data:[
						{ name: '我的', id: '2' },
						{ name: '下属的', id: '3' }
					],active:null}
				],
				tableData: [],
				tableHeader:[
					{label:'计划名称',prop:'name'},
					{label:'客户名称',prop:'custName'},
					{label:'联系人',prop:'contactsName'},
					{label:'拜访目的',prop:'objective'},
					{label:'跟进状态',prop:'statusName'},
					{label:'执行时间',prop:'executorTime'},
					{label:'备注',prop:'remarks'},
					{label:'执行人',prop:'executorName'}
				],
				buttonList:[
					{label:'跟进',type:'primary',click:'handleChange',
						condition: (params) => {
							if (params.status === '1' || params.status === '3') {
								return true
							}
						}
					},
					{label:'延期计划',type:'primary',click:'handleDelay',
						condition: (params) => {
							if (params.status === '1' ) {
								return true
							}
						}
					},
					{label:'取消计划',type:'primary',click:'handleCancelPlan',
						condition: (params) => {
							if (params.status === '1' || params.status === '3') {
								return true
							}
						}
					},
					{label:'附件上传',type:'primary',icon:'\uec23',click:'handleUpload',
						condition: params => {
						  if ((this.$store.getters.userInfo.name === params.executorName || this.$store.getters.userInfo.lev === '10') && params.status === '1' ){
						    return true
						  } else {
						    return false
						  }
						}
					},
					{label:'编辑',type:'primary',icon:'\ueca2',click:'handleEdit',
						condition: params => {
						  if (this.$store.getters.userInfo.name === params.executorName || this.$store.getters.userInfo.lev === '10'){
						    return true
						  } else {
						    return false
						  }
						}
					},
					{label:'删除',type:'error',icon:'\uec83',click:'handleDelete',
						condition: params => {
						  if (this.$store.getters.userInfo.lev === '10') {
						    return true
						  } else {
						    return false
						  }
						}
					}
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientVisitorsToPlanApi.getCrmVisitorQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
					  if (xdd.status === '1') {
					    xdd.statusName = '未跟进'
					  } else if (xdd.status === '2') {
					    xdd.statusName = '已跟进'
					  } else if (xdd.status === '3') {
					    xdd.statusName = '延期'
					  } else if (xdd.status === '4') {
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
			},
			// 搜索
			handleCustom(e){
				this.fromValiData.name = e
				this.doSearch()
			},
			// 跟进
			handleChange(params){
				uni.navigateTo({
				    url: '../trackRecord/edit?change=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			// 延期计划
			handleDelay(params){
				uni.navigateTo({
				    url: './delay?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			// 取消计划
			handleCancelPlan(params){
				let that = this
				uni.showModal({
					title:'提示',
					content:'此操作将取消计划，是否继续？',
					success(res) {
						if(res.confirm){
							params.status = '4'
							that.$u.api.clientVisitorsToPlanApi.getCrmVisitorAddOrModify(params,that).then(res=>{
								that.$refs.tableRef.$refs.uToast.show({
									title: '取消成功',
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
							that.$u.api.clientVisitorsToPlanApi.getCrmVisitorDelCrmVisitorIds({ids:row.id},that).then(res=>{
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
