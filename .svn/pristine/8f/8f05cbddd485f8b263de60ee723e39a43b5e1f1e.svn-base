<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="客户名称:" prop="custName">
				<my-form v-model="fromValiData.custName" name="select" type="select" :selectList="custData"
					@confirm="getCustData" placeholder="请选择客户名称" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="描述:" prop="offerDescribe">
				<my-form name="input" type="input" v-model="fromValiData.offerDescribe" placeholder="请输入描述"></my-form>
			</u-form-item>
			<u-form-item label="金额:" prop="offerAmountOfmoney">
				<my-form name="input" type="input" v-model="fromValiData.offerAmountOfmoney" placeholder="请输入金额"></my-form>
			</u-form-item>
			<u-form-item label="是否盖章扫描:" prop="stamp" :label-width='260'>
				<u-switch v-model="fromValiData.stamp"></u-switch>
			</u-form-item>
			<u-form-item label="盖章类型:" prop="typeName" v-show="fromValiData.stamp">
				<my-form v-model="fromValiData.typeName" name="select" type="select" :selectList="typeData"
					@confirm="getTypeData" placeholder="请选择盖章类型"></my-form>
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
				custId:'',
				custName:'',
				offerDescribe:'',
				offerAmountOfmoney:'',
				type:'',
				typeName:''
			},
			rules: {
				custName: [{
					required: true,
					message: '请选择客户名称',
					trigger: 'change'
				}],
				offerDescribe: [{
					required: true,
					message: '请输入描述',
					trigger: 'change'
				}],
				offerAmountOfmoney: [{
					required: true,
					message: '请输入金额',
					trigger: 'change'
				},{
					required: true,
					type:'number',
					message: '金额必须为数字',
					trigger: 'change'
				}],
				typeName: [{
					required: true,
					message: '请选择盖章类型',
					trigger: 'change'
				}]
			},
			errorType: ['message'],
			
			custData:[],
			typeData:[
				{ name: '报价章', id: '1' }, { name: '公章', id: '2' }
			]
    }
  },
  methods: {
		getCustListData(){
			let ids = {}
			ids.pageSize = 999,
		  ids.pageNow = 1,
		  ids.opermanUser = this.$store.getters.userInfo.name,
		  ids.opermanUserId = this.$store.getters.userInfo.userId
			this.$u.api.clientInfoApi.getCustQueryPageData(ids, this).then(res => {
				this.custData = res.result.pageList
			})
		},
		getCustData(params){
			this.fromValiData.custId = params[0].value
			this.fromValiData.custName = params[0].label
			this.changeCust(this.fromValiData.custId)
			this.$forceUpdate()
		},
		getTypeData(params){
			this.fromValiData.type = params[0].value
			this.fromValiData.typeName = params[0].label
			this.$forceUpdate()
		},
  },
  onLoad (params) {
		this.getCustListData()
  },
  onReady () {
		this.$refs.fromValiData.setRules(this.rules);
  },
	onNavigationBarButtonTap() {
		this.$refs.fromValiData.validate(valid => {
			if (valid) {
				this.$store.dispatch('setIsShow',true)
				let ids = JSON.parse(JSON.stringify(this.fromValiData))
				if(ids.stamp){
					ids.stamp = '1'
				}else{
					ids.stamp = '2'
					delete this.fromValiData.type
					delete this.fromValiData.typeName
				}
				this.$u.api.clientQuotationRecordApi.getCrmOfferAddOrModify(ids, this).then(res => {
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
