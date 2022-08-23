<template>
	<my-pagge :isShow="isShow">
		<my-list :obj="this" ref="tableRef" :tableData="tableData" :tableHeader="tableHeader"
			:scrollTop="scrollTop" @handleDetails="handleDetails">
		</my-list>
	</my-pagge>
</template>

<script>
	export default {
		props: {
			params: Object
		},
		data() {
			return {
				isShow:false,
				fromValiData: {
					pageSize: 10,
					pageNow: 1
				},
				tableData: [],
				tableHeader: [
					{label: '项目名称',prop: 'taskName'},
					{label: '合同任务名称',prop: 'proName'},
					{label: '是否周期',prop: 'isCycleName'},
					{label: '任务状态',prop: 'statusName'},
					{label: '现场负责人',prop: 'opermanName'}
				],
				scrollTop: 0
			}
		},
		methods: {
			getListData() {
				let ids = {}
				ids.contId = this.params.id
				this.$store.dispatch('setIsShow',true)
				this.$u.api.msgApi.getContractQueryStructure(ids, this).then(res => {
					if(res.result.length > 0 && res.result[0].children){
						res.result[0].children.forEach(xdd => {
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
						  switch (xdd.isCycle) {
						    case '1':
						      xdd.isCycleName = '是' + (xdd.checkDetail === null ? '' : '(' + xdd.checkDetail + ')')
						      break
						    case '0':
						      xdd.isCycleName = '否'
						      break
						  }
							xdd.taskName += '(主)'
						})
						this.tableData = res.result[0].children
					}
				})
			},
			handleDetails(params){
				uni.navigateTo({
					url: './modular/task_list?params=' + encodeURIComponent(JSON.stringify(params))
				})
			}
		},
		mounted() {
			this.getListData()
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">

</style>
