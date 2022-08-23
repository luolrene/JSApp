<template>
	<my-pagge :isShow="isShow">
		<process :options="options" v-if="options.length > 0"></process>
		<my-empty v-else text="暂无流程明细"></my-empty>
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				options: [],

				current: 0
			}
		},
		methods: {
			getListData() {
				let ids = {}
				ids.taskId = this.fromValiData.checkTask
				this.options = []
				this.$store.dispatch('setIsShow',true)
				this.$u.api.contractVerityApi.getCheckTaskQueryLogs(ids, this).then(res => {
					res.result.logList.forEach(xdd => {
						this.options.push({
							oper: xdd.oper,
							operMobile:xdd.operMobile,
							operTime:xdd.operTime,
							step:xdd.step,
							exp:xdd.exp,
						})
					})
					this.current = res.result.step - 1
				})
			}
		},
		onLoad(params) {
			if (params.params) {
				this.fromValiData = JSON.parse(params.params)
			}
		},
		onReady() {
			this.getListData()
		}
	}
</script>

<style scoped lang="scss">

</style>
