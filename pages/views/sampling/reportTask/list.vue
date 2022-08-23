<!-- 采样任务 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入监测计划名称"
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
					pageNow: 1,
					type: '1' // 1采样 2送样
				},
				searchData:[
					{type:'input',name:'项目名称',prop:'proName'},
					{type:'input',name:'报告编号',prop:'reportNo'},
					{type:'input',name:'客户名称',prop:'custName'},
					{type:'select',name:'是否周期',prop:'isCycle',data:[
						{ name: '是', id: '1' },
						{ name: '否', id: '0' }
					],active:null},
					{type:'select',name:'报告任务状态',prop:'status',data:[
						{ id: '0', name: '未启动' },
						{ id: '1', name: '启动' },
						{ id: '2', name: '撤回' },
						{ id: '3', name: '完成' },
						{ id: '4', name: '放弃' }
					],active:null},
				],
				tableData: [],
				tableHeader:[
					{label:'监测计划名称',prop:'name'},
					{label:'项目名称',prop:'proName'},
					{label:'报告编号',prop:'reportNo'},
					{label:'是否周期',prop:'isCycleName',
						conditionColor:function(params){
							if(params.isCycle === '1'){
								return 'red'
							}
						}
					},
					{label:'现场负责人',prop:'opermanName'},
					{label:'创建时间',prop:'creatTime'},
					{label:'采样开始时间',prop:'cyStartTime'},
					{label:'采样完成时间',prop:'cyEndTime'},
					{label:'记录审核时间',prop:'checkTime'},
					{label:'状态',prop:'statusName'}
				],
				buttonList:[
					{label:'样品管理',type:'primary',icon:'',click:'handleSample'}
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
				statusData:[
					{id: '0', name: '未启动'},
					{id: '1', name: '启动'},
					{id: '2', name: '撤回'},
					{id: '3', name: '完成'},
					{id: '4', name: '放弃'}
				], //状态
				activeStatus:1,
				
				searchShow:false
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.reportTaskApi.getReportTaskQueryPageList(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
					  switch (xdd.status) {
					    case '0':
					      xdd.statusName = '未启动'
					      break
					    case '1':
					      xdd.statusName = '启动'
					      break
					    case '2':
					      xdd.statusName = '撤回'
					      break
					    case '3':
					      xdd.statusName = '完成'
					      break
					    case '4':
					      xdd.statusName = '放弃'
					      break
					  }
						switch (xdd.contStatus) {
						   case '00':
						    xdd.contStatusName = '草稿'
						    break
						  case '01':
						    xdd.contStatusName = '审核中'
						    break
						  case '02':
						    xdd.contStatusName = '审核通过'
						    break
						  case '03':
						    xdd.contStatusName = '审核退回'
						    break
						  case '04':
						    xdd.contStatusName = '放弃'
						    break
						  case '05':
						    xdd.contStatusName = '已完成'
						    break
						  case '06':
						    xdd.contStatusName = '进行中'
						    break
						  case '07':
						    xdd.contStatusName = '变更审核'
						    break
						}
					  switch (xdd.isCycle) {
					    case '1':
					      xdd.isCycleName = '是' + (xdd.checkDetail === null ? '' : '(' + xdd.checkDetail + ')')
					      break
					    case '0':
					      xdd.isCycleName = '否'
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
				this.fromValiData.name = e
				this.doSearch()
			},
			// 点击图标展开搜索选择菜单
			handleIcon(){
				this.searchShow = true
			},
			//点击菜单
			handleMenu(item,index,name,active){
				if(this[active] === index){
					this[active] = null
					delete this.fromValiData[name]
				}else{
					this[active] = index
					this.fromValiData[name] = item.id
				}
			},
			handleDetails(params){
				this.$u.api.msgApi.getContractQueryContractById({
					contId: params.contId
				}, this).then(res => {
					uni.navigateTo({
						url: '../../contract/msg/detail?params=' + encodeURIComponent(JSON.stringify(res.result)) 
					})
				})
			},
			// 菜单搜索
			handleSearch(){
				this.searchShow = false
				this.doSearch()
			},
			// 菜单重置
			handleReset(){
				delete this.fromValiData.status
				this.doSearch()
			},
			handleSample(params){
				uni.navigateTo({
				    url: './sample_list?params=' + encodeURIComponent(JSON.stringify(params))
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
