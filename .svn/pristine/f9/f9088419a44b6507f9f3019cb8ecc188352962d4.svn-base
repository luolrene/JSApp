<template>
	<my-pagge>
		<my-list :obj="this" ref="tableRef" :tableData="tableData" :tableHeader="tableHeader" :loadStatus="loadStatus"
			:scrollTop="scrollTop" :isLoadmore="false">
		</my-list>
		<my-tabbar></my-tabbar>
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				fromValiData: {},
				tableData: [],
				tableHeader: [{
						label: '待处理任务',
						prop: 'describe'
					},
					{
						label: '数量',
						prop: 'sum'
					},
				],
				loadStatus: 'loadmore',
				scrollTop: 0
			}
		},
		methods: {
			getListData() {
				this.tableData = []
				this.$u.api.commonApi.getSysQueryWorkbench(this.fromValiData, this).then(res => {
					res.result.forEach(xdd=>{
						if(xdd.data.length > 0){
							this.tableData =  this.tableData.concat(xdd.data)
						}
					})
				})
			},
		},
		onShow() {
			if(this.$store.getters.system === 'OA'){
				this.$store.dispatch('setSystem', 'TAS').then(res => {
					this.$u.api.homeApi.getUserGetUserInfoTAS('', this).then(res=>{
						return res
					}).then(res=>{
						this.$store.dispatch('setUserInfo', res.result).then(res => {
							this.getListData()
						})
					})
				})
			}else{
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
