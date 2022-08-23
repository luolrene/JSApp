<template>
  <view class="">
    <u-subsection
			:list="list"
			:current="0"
			@change="changeData"
			active-color="#4D72E4"
			inactive-color="#666666"
		></u-subsection>
		
		<my-pagge :isShow="isShow">
			<my-list :obj="this" ref="tableRef" :tableData="tableData" :tableHeader="tableHeader" :buttonList="buttonList"
				:loadStatus="loadStatus" :scrollTop="scrollTop" @handleDetails="handleDetails">
			</my-list>
		</my-pagge>
  </view>
</template>

<script>
export default {
  data () {
    return {
			list: [
				{name: '未读消息'},
				{name: '已读消息'}
			],
			
			isShow:false,
			fromValiData: {
				pageSize: 10,
				pageNow: 1,
				isRead:'0'
			},
			tableData: [],
			tableHeader: [{
					label: '推送标题',
					prop: 'title'
				},
				{
					label: '提示信息',
					prop: 'detail'
				}
			],
			buttonList: [{
				label: '删除',
				type: 'error',
				icon: '\uec83',
				click: 'handleDelete',
				condition:(params)=>{
					if(params.isRead === '1'){
						return true
					}
				}
			}],
			loadStatus: 'loadmore',
			scrollTop: 0,
    }
  },
  methods: {
		changeData(e){
			this.fromValiData.isRead = e.toString()
			this.doSearch()
		},
		getListData(){
			this.$store.dispatch('setIsShow',true)
			this.$u.api.homeApi.getMsgQueryPageList(this.fromValiData, this).then(res => {
				
				this.tableData = this.tableData.concat(res.result.pageList)
				this.fromValiData.dataSum = res.result.dataSum
				if (this.tableData.length >= this.fromValiData.dataSum) {
					this.loadStatus = 'nomore';
				}
				uni.stopPullDownRefresh()
			})
		},
		handleDelete(params) {
			let that = this
			uni.showModal({
				title: '提示',
				content: '此操作将永久删除消息，是否继续？',
				success(res) {
					if (res.confirm) {
						that.$u.api.homeApi.getMsgDelMsgs({
							ids: params.id
						}, that).then(res => {
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
		handleDetails(params){
			uni.navigateTo({
				url: './push_detail?params=' + encodeURIComponent(JSON.stringify(params)) 
			})
		},
		doSearch() {
			this.fromValiData.pageNow = 1
			this.tableData = []
			this.getListData()
		},
  },
  onLoad () {
  	
  },
  onShow () {
		this.doSearch()
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
