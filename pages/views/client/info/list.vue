<!-- 客户信息 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:data="searchData"
		:iconShow="true"
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
				tableData: [],
				tableHeader:[
					{label:'客户名称',prop:'name'},
					{label:'客户行业',prop:'industryName'},
					{label:'客户性质',prop:'typeName'},
					{label:'省-市-区',prop:'areaData'},
					{label:'跟进人',prop:'userNameS'},
					{label:'创建时间',prop:'createTime'},
				],
				buttonList:[
					{label:'联系人',type:'primary',click:'handleUser'},
					{label:'附件上传',type:'primary',icon:'\uec23',click:'handleUpload'},
					{label:'编辑',type:'primary',icon:'\ueca2',click:'handleEdit'},
					{label:'删除',type:'error',icon:'\uec83',click:'handleDelete'}
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
				
				searchShow:false,

				searchData:[
					{type:'date',name:'开始日期',prop:'startTime',isShow:false},
					{type:'date',name:'结束日期',prop:'nextTime',isShow:false},
					{type:'select',name:'客户性质',prop:'type',data:[
						{ name: '个人', id: '1' },
						{ name: '政府', id: '2' },
						{ name: '事业单位', id: '3' },
						{ name: '私有企业', id: '4' },
						{ name: '国有企业', id: '5' },
						{ name: '外资企业', id: '6' },
						{ name: '合资企业', id: '7' }
					],active:null},
					{type:'select',name:'客户级别',prop:'importantCustomers',data:[
						{ name: '普通客户', id: '1' },
						{ name: '重点客户', id: '2' },
						{ name: 'VIP客户', id: '3' }
					],active:null},
					{type:'select',name:'归属',prop:'other',data:[
						{ name: '我的', id: '2' },
						{ name: '下属', id: '3' }
					],active:null},
				]
			}
		},
		methods: {
			getListData() {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientInfoApi.getCustQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
						switch (xdd.type) {
							case '1':
								xdd.typeName = '个人'
								break
							case '2':
								xdd.typeName = '政府'
								break
							case '3':
								xdd.typeName = '事业单位'
								break
							case '4':
								xdd.typeName = '私有企业'
								break
							case '5':
								xdd.typeName = '国有企业'
								break
							case '6':
								xdd.typeName = '外资企业'
								break
							case '7':
								xdd.typeName = '合资企业'
								break
						}
						xdd.areaData = xdd.province + '-' + xdd.city + '-' + xdd.area
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
			handleUpload(params){
				uni.navigateTo({
					url:'../../common/upload?fileId=' + params.id + '&fileType="4"'
				})
			},
			handleDetails(params){
				uni.navigateTo({
					url:'./details?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			handleUser(params){
				uni.navigateTo({
					url:'./user?custId=' + params.id
				})
			},
			handleEdit(params){
				uni.navigateTo({
				    url: './edit?params=' + encodeURIComponent(JSON.stringify(params))
				})
			},
			handleDelete(row){
				let that = this
				uni.showModal({
					title:'提示',
					content:'此操作将永久删除该数据，是否继续？',
					success(res) {
						if(res.confirm){
							that.$u.api.clientInfoApi.getCustDelCusts({id:row.id},that).then(res=>{
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
