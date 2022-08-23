<!-- 延期 -->
<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="延期时间:" prop="delayTime">
				<my-form v-model="fromValiData.delayTime" name="select" type="date" @confirm="getTimeData($event, 'delayTime')"
					placeholder="请选择延期时间"></my-form>
			</u-form-item>
			<u-form-item label="延期原因:" prop="delayReason">
				<my-form name="input" type="input" v-model="fromValiData.delayReason" placeholder="请输入延期原因"></my-form>
			</u-form-item>
			<u-form-item label="延期备注:" prop="delayRemarks">
				<my-form name="input" type="input" v-model="fromValiData.delayRemarks" placeholder="请输入延期备注"></my-form>
			</u-form-item>
			</u-select>
		</u-form>
	</my-pagge>
</template>

<script>
export default {
  data () {
    return {
			isShow:false,
			disabled:false,
			fromValiData:{
				delayTime:'',
				delayReason:'',
				delayRemarks:''
			},
			rules: {
				delayTime: [{
					required: true,
					message: '请选择延期时间',
					trigger: 'change'
				}],
				delayReason: [{
					required: true,
					message: '请输入延期原因',
					trigger: 'change'
				}],
			},
			errorType: ['message'],
    }
  },
  methods: {
		// 日期赋值
		getTimeData(params,e) {
			this.fromValiData[e] = params.result
			this.$forceUpdate()
		},
  },
  onLoad (params) {
  	if(params.params){
  		this.fromValiData = JSON.parse(params.params)
			this.fromValiData.status = '3'
  	}
  },
  onReady () {
		this.$refs.fromValiData.setRules(this.rules);
  },
	onNavigationBarButtonTap() {
		this.$refs.fromValiData.validate(valid => {
			if (valid) {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientVisitorsToPlanApi.getCrmVisitorAddOrModify(this.fromValiData, this).then(res => {
					let pages = getCurrentPages() // 当前页面
					let beforePage = pages[pages.length - 2] //上一页
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
					uni.navigateBack();
				})
			}
		});
	},
}
</script>

<style scoped lang="scss">

</style>
