<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="客户名称:" prop="custName">
				<my-form v-model="fromValiData.custName" name="select" type="select" :selectList="custData"
					@confirm="getCustData" placeholder="请选择客户名称" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="联系人:" prop="contacts">
				<my-form v-model="fromValiData.contacts" name="select" type="select" :selectList="contactsData"
					@confirm="getContactsData" placeholder="请选择联系人" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="计划名称:" prop="name">
				<my-form name="input" type="input" v-model="fromValiData.name" placeholder="请输入计划名称" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="拜访目的:" prop="objective">
				<my-form name="input" type="input" v-model="fromValiData.objective" placeholder="请输入拜访目的"></my-form>
			</u-form-item>
			<u-form-item label="计划日期:" prop="executorTime">
				<my-form v-model="fromValiData.executorTime" name="select" type="date" @confirm="getTimeData($event, 'executorTime')"
					placeholder="请选择计划日期"></my-form>
			</u-form-item>
			<u-form-item label="备注:" prop="remarks">
				<my-form name="input" type="input" v-model="fromValiData.remarks" placeholder="请输入备注"></my-form>
			</u-form-item>
			<u-form-item label="提醒时间:" prop="remind">
				<my-form v-model="fromValiData.remind" name="select" type="date" @confirm="getTimeData($event, 'remind')"
					placeholder="请选择提醒时间"></my-form>
			</u-form-item>
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
				custName:'',
				contacts:'',
				contactsName:'',
				name:'',
				objective:'',
				executorTime:''
			},
			rules: {
				custName: [{
					required: true,
					message: '请选择客户名称',
					trigger: 'change'
				}],
				contacts: [{
					required: true,
					message: '请选择联系人',
					trigger: 'change'
				}],
				name: [{
					required: true,
					message: '请输入计划名称',
					trigger: 'change'
				}],
				objective: [{
					required: true,
					message: '请输入访目的',
					trigger: 'change'
				}],
				executorTime: [{
					required: true,
					message: '请选择计划日期',
					trigger: 'change'
				}]
			},
			errorType: ['message'],
			custData:[],
			contactsData:[],
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
		},
		getContactsData(params){
			this.fromValiData.contactsId = params[0].value
			this.fromValiData.contacts = params[0].label
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
			this.fromValiData.contacts = this.fromValiData.contactsName
  		this.disabled = true
  		this.changeCust(this.fromValiData.custId)
  	}else{
			this.fromValiData.status = '1'
		}
  	this.getCustListData()
  },
  onReady () {
		this.fromValiData.executorId = this.$store.getters.userInfo.userId
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
