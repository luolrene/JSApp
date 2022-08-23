<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="客户名称:" prop="custName">
				<my-form v-model="fromValiData.custName" name="select" type="select" :selectList="custData"
					@confirm="getCustData" placeholder="请选择客户名称" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="联系人:" prop="contactsName">
				<my-form v-model="fromValiData.contactsName" name="select" type="select" :selectList="contactsData"
					@confirm="getContactsData" placeholder="请选择联系人" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="销售机会名称:" prop="opportunityName" :label-width='200'>
				<my-form name="input" type="input" v-model="fromValiData.opportunityName" placeholder="请输入销售机会名称" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="销售阶段:" prop="stageName">
				<my-form v-model="fromValiData.stageName" name="select" type="select" :selectList="stageData"
					@confirm="getStageData" placeholder="请选择销售阶段"></my-form>
			</u-form-item>
		<!-- 	<u-form-item label="备注描述:" prop="remarks">
				<my-form name="input" type="input" v-model="fromValiData.remarks" placeholder="请输入备注描述"></my-form>
			</u-form-item> -->
			<u-form-item label="项目板块:" prop="relation">
				<my-form name="input" type="input" v-model="fromValiData.relation" placeholder="请输入项目板块" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="预计金额:" prop="estimatedAmount">
				<my-form name="input" type="input" v-model="fromValiData.estimatedAmount" placeholder="请输入预计金额" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="预计结束日期:" prop="estimatedTime" :label-width='200'>
				<my-form v-model="fromValiData.estimatedTime" name="select" type="date" @confirm="getTimeData($event, 'estimatedTime')"
					placeholder="请选择预计结束日期" :disabled="disabled"></my-form>
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
				contactsId:'',
				contactsName:'',
				opportunityName:'',
				opportunityName:'',
				stage:'',
				stageName:'',
				relation:'',
				estimatedAmount:'',
				estimatedTime:''
			},
			rules: {
				custName: [{
					required: true,
					message: '请选择客户名称',
					trigger: 'change'
				}],
				contactsName: [{
					required: true,
					message: '请选择联系人',
					trigger: 'change'
				}],
				opportunityName: [{
					required: true,
					message: '请填写销售机会名称',
					trigger: 'change'
				}],
				stageName: [{
					required: true,
					message: '请选择销售阶段',
					trigger: 'change'
				}],
				estimatedAmount: [{
					required: true,
					message: '请填写预计金额',
					trigger: 'change'
				},{
					required: true,
					message: '金额必须为数字',
					type:'number',
					trigger: 'change'
				}],
				estimatedTime: [{
					required: true,
					message: '请选择预计结束日期',
					trigger: 'change'
				}],
			},
			errorType: ['message'],
			custData:[],
			contactsData:[],
			stageData:[
				{ name: '发现需求', id: '1' },
				{ name: '确认需求', id: '2' },
				{ name: '商务谈判', id: '3' },
				{ name: '合同签订', id: '4' }
			],
			
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
			// this.$forceUpdate()
		},
		changeCust(custId){
			let ids = {}
			ids.custId = custId
			this.$u.api.clientInfoApi.getCustQueryContacts(ids, this).then(res => {
				if(res.result.length === 0){
					uni.showToast({
					    title: '当前客户下无联系人',
					    duration: 2000
					});
					return
				}
				this.contactsData = res.result
			})
			
			this.$u.api.clientSalesLeadsApi.getCrmSaleOpportunityQueryPageData({
				custId: custId,
				pageSize: '999',
				pageNow: '1',
				stages: '1,2,3'
			}, this).then(res => {
				this.name1Data = res.result.pageList
			})
		},
		getContactsData(params){
			this.fromValiData.contactsId = params[0].value
			this.fromValiData.contactsName = params[0].label
		},
		getStageData(params){
			this.fromValiData.stage = params[0].value
			this.fromValiData.stageName = params[0].label
			this.$forceUpdate()
		},
		// 日期赋值
		getTimeData(params,e) {
			this.fromValiData[e] = params.result
			this.$forceUpdate()
		},
  },
  onLoad (params) {
  	if(params.params){
  		this.fromValiData = JSON.parse(params.params)
  		this.disabled = true
  	}
		this.getCustListData()
  },
  onReady () {
		this.$refs.fromValiData.setRules(this.rules);
  },
	onNavigationBarButtonTap() {
		this.$refs.fromValiData.validate(valid => {
			if (valid) {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientSalesLeadsApi.getCrmSaleOpportunityAddOrModify(this.fromValiData, this).then(res => {
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
