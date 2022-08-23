<!-- 工作报告 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入工作报告名称"
		@handleCustom="handleCustom"></my-search>
		<view class="listOneButton" @click="handleAssign">
			<span class="iconfont">&#xeb8b;</span><span class="text">工作指派</span>
		</view>
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
					other: "2"
				},
				searchData:[
					{type:'date',name:'开始日期',prop:'reportTimeK',isShow:false},
					{type:'date',name:'结束日期',prop:'reportTimeJ',isShow:false},
					{type:'input',name:'执行人',prop:'createUserName'},
					{type:'select',name:'报告状态',prop:'submitType',data:[
						{ id: '1', name: '已提交' },
						{ id: '2', name: '未提交' }
					],active:null},
					{type:'select',name:'报告类型',prop:'reportType',data:[
						{ id: '1', name: '日报' },
						{ id: '2', name: '周报' },
						{ id: '3', name: '月报' },
						{ id: '4', name: '季报' },
						{ id: '5', name: '年报' },
						{ id: '6', name: '其他' }
					],active:null}
				],
				tableData: [],
				tableHeader:[
					{label:'报告名称',prop:'reportName'},
					{label:'报告类型',prop:'reportTypeName'},
					{label:'报告内容',prop:'reportContent'},
					{label:'报告时间',prop:'reportTime'},
					{label:'报告状态',prop:'submitTypeName'},
					{label:'执行人',prop:'createUserName'}
				],
				buttonList:[
					{label:'提交',type:'primary',click:'handleSubmit',
						condition: (params) => {
							if (params.submitType === '2') {
								return true
							}
						}
					},
					{label:'附件上传',type:'primary',icon:'\uec23',click:'handleUpload',	},
					{label:'编辑',type:'primary',icon:'\ueca2',click:'handleEdit'},
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientReportApi.getCrmReportQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
					  switch (xdd.submitType) {
					    case '1':
					      xdd.submitTypeName = '已提交'
					      break
					    case '2':
					      xdd.submitTypeName = '未提交'
					      break
					  }
					  switch (xdd.reportType) {
					    case '1':
					      xdd.reportTypeName = '日报'
					      break
					    case '2':
					      xdd.reportTypeName = '周报'
					      break
					    case '3':
					      xdd.reportTypeName = '月报'
					      break
					    case '4':
					      xdd.reportTypeName = '季报'
					      break
					    case '5':
					      xdd.reportTypeName = '年报'
					      break
					    case '6':
					      xdd.reportTypeName = '其他'
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
			handleAssign(){
				uni.navigateTo({
					url:'./assign_list'
				})
			},
			// 搜索
			handleCustom(e){
				this.fromValiData.reportName = e
				this.doSearch()
			},
			handleSubmit(row){
				let that = this
				uni.showModal({
					title:'提示',
					content:'此操作将提交报告，是否继续？',
					success(res) {
						if(res.confirm){
							let ids = JSON.parse(JSON.stringify(row))
							ids.submitType = '1'
							that.$u.api.clientReportApi.getCrmReportAddOrModify(ids,that).then(res=>{
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
