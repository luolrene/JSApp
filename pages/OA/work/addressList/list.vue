<!-- 通讯录 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入姓名"
		@handleCustom="handleCustom"></my-search>
		<my-pagge :isShow="isShow">
			<my-list
				:obj="this"
				ref="tableRef"
				:tableData="tableData"
				:tableHeader="tableHeader"
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
					pageNow: 1
				},
				searchData:[
					{type:'select',name:'单位',prop:'company',data:[
						{ id: '1', name: '九升检测' },
						{ id: '2', name: '集团公司' },
						{ id: '3', name: '两山生态' },
						{ id: '4', name: '吉东科技' },
						{ id: '5', name: '碧泉科技' }
					],active:null},
					{type:'select',name:'部门名称',prop:'groupId',data:[

					],active:null}
				],
				tableData: [],
				tableHeader:[
					{label:'姓名',prop:'name'},
					{label:'单位',prop:'companyName'},
					{label:'部门',prop:'groupName'},
					{label:'行政职级',prop:'administrativeRankName'},
					{label:'角色',prop:'roleName'},
					{label:'联系电话',prop:'mobile'},
					{label:'电子邮箱',prop:'mail'}
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.addressListApi.getUserQueryPageData(this.fromValiData, this).then(res => {
					this.tableData = this.tableData.concat(res.result.pageList)
					this.fromValiData.dataSum = res.result.dataSum
					if (this.tableData.length >= this.fromValiData.dataSum) {
						this.loadStatus = 'nomore';
					}
					uni.stopPullDownRefresh()
				})
			},
			getGroupData(){
				this.$u.api.addressListApi.getGroupQueryPageData({ pageSize: 999, pageNow: 1, father: '0' }, this).then(res => {
					this.searchData.forEach(xdd=>{
						if(xdd.prop === 'groupId'){
							xdd.data = res.result.pageList
						}
					})
				})
			},
			// 搜索
			handleCustom(e){
				this.fromValiData.name = e
				this.doSearch()
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
			this.getGroupData()
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
