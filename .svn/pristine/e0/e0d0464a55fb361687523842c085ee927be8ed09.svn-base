<!-- 联系人列表 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
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
					pageSize: 999,
					pageNow: 1
				},
				tableData: [],
				tableHeader:[
					{label:'联系人',prop:'name'},
					{label:'性别',prop:'sex'},
					{label:'手机号',prop:'mobile'},
					{label:'跟进人',prop:'opermanName'}
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
			handleUpload(params){
				uni.navigateTo({
					url:'../../common/upload?fileId=' + params.id + '&fileType="4"'
				})
			},
			handleEdit(params){
				uni.navigateTo({
				    url: '../contactManage/edit?params=' + encodeURIComponent(JSON.stringify(params))
				})
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
			doSearch() {
				this.fromValiData.pageNow = 1
				this.tableData = []
				this.getListData()
			},
		},
		onLoad(params) {
			if(params.custId){
				this.fromValiData.custId = params.custId
			}
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
			    url: '../contactManage/edit?custId=' + this.fromValiData.custId
			})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style scoped lang="scss">

</style>
