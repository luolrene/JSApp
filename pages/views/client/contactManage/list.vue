<!-- 客联系人 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入联系人名称"
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
					{type:'input',name:'客户名称',prop:'custname'},
					{type:'input',name:'联系电话',prop:'mobile'},
					{type:'input',name:'跟进人',prop:'opermanName'},
					{type:'select',name:'归属',prop:'other',data:[
						{ name: '我的', id: '2' },
						{ name: '下属', id: '3' }
					],active:null}
				],
				tableData: [],
				tableHeader:[
					{label:'联系人',prop:'name'},
					{label:'客户名称',prop:'custName'},
					{label:'联系人电话',prop:'mobile'},
					{label:'性别',prop:'sex'},
					{label:'邮箱',prop:'email'},
					{label:'详细地址',prop:'addressDetailed'},
					{label:'跟进人',prop:'opermanName'}
				],
				buttonList:[
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
				this.$u.api.clientContactManageApi.getCustContactsQueryPageData(this.fromValiData, this).then(res => {
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
			handleDelete(row){
				let that = this
				uni.showModal({
					title:'提示',
					content:'此操作将永久删除该数据，是否继续？',
					success(res) {
						if(res.confirm){
							that.$u.api.clientContactManageApi.getCustDelContacts({ids:row.id},that).then(res=>{
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
