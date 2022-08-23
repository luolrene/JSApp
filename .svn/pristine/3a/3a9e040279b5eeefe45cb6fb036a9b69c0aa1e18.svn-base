<!-- 销售目标 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:iconShow="true"
		:data="searchData"
		placeholder="请输入执行人名称"
		@handleCustom="handleCustom"></my-search>
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
					pageNow: 1
				},
				searchData:[
					{type:'input',name:'创建人',prop:'createUserName',labelWidth:200},
				],
				tableData: [],
				tableHeader:[
					{label:'执行人名称',prop:'userName',isHead:true},
					{label:'销售目标金额',prop:'targetQuota'},
					{label:'目标开始时间',prop:'targetTime'},
					{label:'目标结束时间',prop:'targetTimeEnd'},
					{label:'创建人名称',prop:'createUserName'},
					{label:'创建时间',prop:'createTime'}
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
				this.$u.api.clientSellTargetApi.getCrmTargetQueryPageData(this.fromValiData, this).then(res => {
					this.tableData = this.tableData.concat(res.result.pageList)
					this.fromValiData.dataSum = res.result.dataSum
					uni.stopPullDownRefresh()
					if (this.tableData.length >= this.fromValiData.dataSum) {
						this.loadStatus = 'nomore';
					}
				})
			},
			// 搜索
			handleCustom(e){
				this.fromValiData.userName = e
				this.doSearch()
			},
			handleDelete(row){
				let that = this
				uni.showModal({
					title:'提示',
					content:'此操作将永久删除该数据，是否继续？',
					success(res) {
						if(res.confirm){
							that.$u.api.clientSellTargetApi.getCrmTargetDelCrmTargetIds({ids:row.id},that).then(res=>{
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
