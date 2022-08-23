<!-- 待审批 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入申请标题"
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
					{type:'input',name:'申请人',prop:'createUserName'},
					{type:'date',name:'开始日期',prop:'stateTime',isShow:false},
					{type:'date',name:'结束日期',prop:'endTime',isShow:false},
					{type:'select',name:'审核状态',prop:'state',data:[
						{ id: 1, name: '待审核' },
						{ id: 2, name: '通过' },
						{ id: 3, name: '退回' }
					],active:null}
				],
				tableData: [],
				tableHeader:[
					{label:'申请标题',prop:'customDescription'},
					{label:'流程类型',prop:'processName'},
					{label:'申请人',prop:'applyUserName'},
					{label:'申请时间',prop:'createTime'},
					{label:'状态',prop:'stateName'}
				],
				buttonList:[
					{label:'查看',type:'primary',icon:'',click:'handleQuery',
						condition: (params) => {
							if (params.state === '2') {
								return true
							}
						}
					},
					{label:'审批',type:'primary',icon:'',click:'handleApproval',
						condition: (params) => {
							if (params.state === '1') {
								return true
							}
						}
					},
					{label:'移交',type:'primary',icon:'',click:'handleOverTo',
						condition: (params) => {
							if (params.state === '1') {
								return true
							}
						}
					},
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				if(!this.fromValiData.state){
					this.fromValiData.state = 1
				}
				this.$u.api.myApproveApi.getToExamineStepQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
					  if (xdd.processStartName) {
					    xdd.processName = xdd.processStartName + '/' + xdd.processName
					  }
					  switch (xdd.state) {
					    case '1':
					      xdd.stateName = '待审核'
					      break
					    case '2':
					      xdd.stateName = '通过'
					      break
					    case '3':
					      xdd.stateName = '退回'
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
				this.fromValiData.customDescription = e
				this.doSearch()
			},
			handleQuery(params){
				
			},
			handleApproval(params){
				
			},
			handleOverTo(params){
				
			},
			handleDetails(params){
				// let ids = {}
				// ids.id = params.custId
				// this.$u.api.clientInfoApi.getCustGetCustomerById(ids,this).then(res=>{
				// 	uni.navigateTo({
				// 		url:'../info/detail?params=' + encodeURIComponent(JSON.stringify(res.result))
				// 	})
				// })
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
