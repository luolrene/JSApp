<!-- 合同信息 -->
<template>
	<view>
		<my-search 
		:fromValiData="fromValiData"
		:data="searchData"
		:iconShow="true"
		:obj="this"
		placeholder="请输入合同任务名称"
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
				current: 1,
				fromValiData: {
					pageSize: 10,
					pageNow: 1,
					project:''
				},
				tableData: [],
				tableHeader: [
					{label: '项目名称',prop: 'project'},{
						label: '合同编号',
						prop: 'contNo'
					},
					{label: '项目板块',prop: 'plateName'},
					{label: '项目类型',prop: 'projectTypeName'},
					{label: '客户名称',prop: 'custName'},
					{label: '付款方式',prop: 'payTypeName'},
					{label: '寄送方式',prop: 'mailTypeName'},
					{label: '项目期限',prop: 'proTerm'},
					{label: '合同状态',prop: 'statusName'}
				],
				buttonList: [
					{
						label: '提交审核',
						type: 'primary',
						icon: '',
						click: 'handleReview',
						condition: (params) => {
							if (params.status === '00' || params.status === '03') {
								return true
							}
						}
					},
					{
						label: '附件上传',
						type: 'primary',
						icon: '\uec23',
						click: 'handleUpload',
						condition: (params) => {
							if (params.status === '00' || params.status === '03') {
								return true
							}
						}
					},
					{
						label: '编辑',
						type: 'primary',
						icon: '\ueca2',
						click: 'handleEdit',
						condition: (params) => {
							if (params.status === '00' || params.status === '03') {
								return true
							}
						}
					},
					{
						label: '放弃',
						type: 'error',
						icon: '\uec83',
						click: 'handleDelete',
						condition: (params) => {
							if (params.status !== '04') {
								return true
							}
						}
					}
				],
				loadStatus: 'loadmore',
				scrollTop: 0,

				plateData: [], // 项目板块
				projectTypeData: [], // 项目类型
				payTypeData: [], // 付款方式
				mailTypeData: [], // 寄送方式
				
				searchData:[
					{type:'input',name:'客户名称',prop:'custName'},
					{type:'select',name:'项目板块',prop:'plate',data:[],active:null},
					{type:'select',name:'项目类型',prop:'projectType',data:[],active:null},
					{type:'select',name:'付款方式',prop:'payType',data:[],active:null},
					{type:'select',name:'寄送方式',prop:'mailType',data:[],active:null},
					{type:'select',name:'合同状态',prop:'status',data:[
						{id: '00', name: '初始'},
						{id: '01', name: '审核中'},
						{id: '02', name: '审核通过'},
						{id: '03', name: '审核退回'},
						{id: '04', name: '放弃'},
						{id: '05', name: '已完成'},
						{id: '06', name: '启动'},
						{id: '07', name: '调整中'}
					],active:null}
				]
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
			// 搜索
			handleCustom(e){
				this.fromValiData.project = e
				this.doSearch()
			},
			handleReview(params) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '此操作将提交审核，是否继续？',
					success(res) {
						if (res.confirm) {
							that.$u.api.msgApi.getContractSubmitToCheck({
								ids: params.id
							}, that).then(res => {
								that.$refs.tableRef.$refs.uToast.show({
									title: '提交成功',
									type: 'success',
								})
								that.doSearch()
							})
						}
					}
				})
			},
			// 附件上传
			handleUpload(params){
				uni.navigateTo({
					url:'../../common/upload?fileId=' + params.id
				})
			},
			handleEdit(params) {
				uni.navigateTo({
					url: './edit?params=' + encodeURIComponent(JSON.stringify(params)) +
						'&plateData=' + encodeURIComponent(JSON.stringify(this.plateData)) +
						'&projectTypeData=' + encodeURIComponent(JSON.stringify(this.projectTypeData)) +
						'&payTypeData=' + encodeURIComponent(JSON.stringify(this.payTypeData)) +
						'&mailTypeData=' + encodeURIComponent(JSON.stringify(this.mailTypeData))
				})
			},
			handleDetails(params){
				uni.navigateTo({
					url: './detail?params=' + encodeURIComponent(JSON.stringify(params)) 
				})
			},
			handleDelete(params) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '此操作将永久放弃合同，是否继续？',
					success(res) {
						if (res.confirm) {
							that.$u.api.msgApi.getContractDropContract({
								ids: params.id
							}, that).then(res => {
								that.$refs.tableRef.$refs.uToast.show({
									title: '放弃成功',
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
			getEditData() {
				this.$u.api.commonApi.getSysQueryDict({
					'type': 'XMBK'
				}, this).then(res => {
					this.plateData = res.result
					this.searchData.forEach(xdd=>{
						if(xdd.prop === 'plate'){
							xdd.data = res.result
						}
					})
				})
				this.$u.api.commonApi.getSysQueryDict({
					'type': 'XMLX'
				}, this).then(res => {
					res.result.forEach(xdd=>{
						xdd.checked = false
					})
					this.projectTypeData = res.result
					this.searchData.forEach(xdd=>{
						if(xdd.prop === 'projectType'){
							xdd.data = res.result
						}
					})
				})
				this.$u.api.commonApi.getSysQueryDict({
					'type': 'FKFS'
				}, this).then(res => {
					this.payTypeData = res.result
					this.searchData.forEach(xdd=>{
						if(xdd.prop === 'payType'){
							xdd.data = res.result
						}
					})
				})
				this.$u.api.commonApi.getSysQueryDict({
					'type': 'HTJS'
				}, this).then(res => {
					this.mailTypeData = res.result
					this.searchData.forEach(xdd=>{
						if(xdd.prop === 'mailType'){
							xdd.data = res.result
						}
					})
				})
			}
		},
		onLoad() {
			
		},
		onShow() {
		
		},
		onReady() {
			this.getListData()
			this.getEditData()
		},
		onPullDownRefresh() {
			this.tableData = []
			this.fromValiData = {
				pageSize: 10,
				pageNow: 1,
				project:''
			},
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
				url: './edit?plateData=' + encodeURIComponent(JSON.stringify(this.plateData)) +
					'&projectTypeData=' + encodeURIComponent(JSON.stringify(this.projectTypeData)) +
					'&payTypeData=' + encodeURIComponent(JSON.stringify(this.payTypeData)) +
					'&mailTypeData=' + encodeURIComponent(JSON.stringify(this.mailTypeData))
			})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style scoped lang="scss">

</style>
