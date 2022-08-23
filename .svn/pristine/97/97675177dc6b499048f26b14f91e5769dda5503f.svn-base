<template>
	<view>
		app模板
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		onReady() {

		},
		onShow() {

		},
		methods: {

		},
		onNavigationBarButtonTap() {
			this.$refs.fromValiData.validate(valid => {
				if (valid) {
					this.$store.dispatch('setIsShow',true)
					this.$u.api.clientReportApi.getCrmReportAddOrModify(this.fromValiData, this).then(res => {
						let pages = getCurrentPages() // 当前页面
						let beforePage = pages[pages.length - 3] //上上一页
						// #ifdef H5
						beforePage.$refs.tableRef.$refs.uToast.show({
							title: '保存成功',
							type: 'success',
						})
						beforePage.doSearch()
						// #endif
						// #ifndef H5
						beforePage.$vm.$refs.tableRef.$refs.uToast.show({
							title: '保存成功',
							type: 'success',
						})
						beforePage.$vm.doSearch()
						// #endif
						uni.navigateBack({delta:2}); // 1是上页 2是上上页
					})
				}
			});
		},
	}
</script>

<style scoped lang="scss">
	
</style>