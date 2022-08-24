<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="借款人:" prop="name" v-show="fromValiData.name !==''">
				<my-form name="input" type="input" v-model="fromValiData.name" :disabled="true"></my-form>
			</u-form-item>
			<u-form-item label="部门:" prop="groupName" v-show="fromValiData.groupName !==''">
				<my-form name="input" type="input" v-model="fromValiData.groupName" :disabled="true"></my-form>
			</u-form-item>
			<u-form-item label="借款类别:" prop="typeName">
				<my-form v-model="fromValiData.typeName" name="select" type="select" :selectList="typeData"
					@confirm="getTypeData" placeholder="请选择借款类别"></my-form>
			</u-form-item>
			<u-form-item label="合同号:" prop="contractNumber">
				<my-form name="input" type="input" v-model="fromValiData.contractNumber" placeholder="请输入合同号"></my-form>
			</u-form-item>
			<u-form-item label="合同金额:" prop="contractAmount">
				<my-form name="input" type="input" v-model="fromValiData.contractAmount" placeholder="请输入合同金额"></my-form>
			</u-form-item>
			<u-form-item label="借款金额:" prop="borrowingBalance">
				<my-form name="input" type="input" v-model="fromValiData.borrowingBalance" placeholder="请输入合同金额"></my-form>
			</u-form-item>
			<u-form-item label="借款原因:" prop="borrowingCause">
				<my-form name="input" type="input" v-model="fromValiData.borrowingCause" placeholder="请填写借款原因"></my-form>
			</u-form-item>
			<u-form-item label="借款需求时间:" prop="borrowingDemandTime" :label-width='200'>
				<my-form v-model="fromValiData.borrowingDemandTime" name="select" type="date" @confirm="getTimeData($event, 'borrowingDemandTime')"
					placeholder="请选择借款需求时间"></my-form>
			</u-form-item>
			<u-form-item label="预计还款时间:" prop="repaymentTime" :label-width='200'>
				<my-form v-model="fromValiData.repaymentTime" name="select" type="date" @confirm="getTimeData($event, 'repaymentTime')"
					placeholder="请选择预计还款时间"></my-form>
			</u-form-item>
			<u-form-item label="关联采购申请:" prop="associatedApplication" :label-width='200'>
				<my-form v-model="fromValiData.associatedApplication" name="select" type="select" :selectList="associatedApplicationData"
					@confirm="getAssociatedApplicationData" placeholder="请选择关联采购申请"></my-form>
			</u-form-item>
			<u-form-item label="支付方式:" prop="paymentName">
				<my-form v-model="fromValiData.paymentName" name="select" type="select" :selectList="paymentNameData"
					@confirm="getPaymentNameData" placeholder="请选择支付方式"></my-form>
			</u-form-item>
			<u-form-item label="开户人:" prop="bankUser" v-if="isPayment">
				<my-form v-model="fromValiData.bankUser" name="select" type="select" :selectList="bankUserData"
					@confirm="getBankUserData" placeholder="请选择开户人"></my-form>
			</u-form-item>
			<u-form-item label="开户银行:" prop="bank" v-if="isPayment">
				<my-form name="input" type="input" v-model="fromValiData.bank" placeholder="请输入开户银行"></my-form>
			</u-form-item>
			<u-form-item label="开户支行:" prop="bankSubBranch" v-if="isPayment">
				<my-form name="input" type="input" v-model="fromValiData.bankSubBranch" placeholder="请输入开户支行"></my-form>
			</u-form-item>
			<u-form-item label="银行账号:" prop="bankAccount" v-if="isPayment">
				<my-form name="input" type="input" v-model="fromValiData.bankAccount" placeholder="请输入银行账号"></my-form>
			</u-form-item>
			<u-form-item label="备注:" prop="exp">
				<my-form name="input" type="input" v-model="fromValiData.exp" placeholder="请输入备注"></my-form>
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
			isPayment:true,
			fromValiData:{
				payment:'2',
				paymentName:'银行'
			},
			rules: {
				typeName: [{
					required: true,
					message: '请选择借款类别',
					trigger: 'change'
				}],
				contractNumber: [{
					required: true,
					message: '请填写合同号',
					trigger: 'change'
				}],
				contractAmount: [{
					required: true,
					message: '请输入借款金额',
					trigger: 'change'
				}, {
					required: true,
					type:'number',
					message: '借款金额必须为数字',
					trigger: 'change'
				}],
				borrowingBalance: [{
					required: true,
					message: '请输入借款金额',
					trigger: 'change'
				}, {
					required: true,
					type:'number',
					message: '借款金额必须为数字',
					trigger: 'change'
				}],
				borrowingDemandTime: [{
					required: true,
					message: '请选择借款需求时间',
					trigger: 'change'
				}],
				repaymentTime: [{
					required: true,
					message: '请选择预计还款时间',
					trigger: 'change'
				}],
				borrowingCause: [{
					required: true,
					message: '请填写借款原因',
					trigger: 'change'
				}],
				paymentName: [{
					required: true,
					message: '请选择支付方式',
					trigger: 'change'
				}],
				bankUser: [{
					required: true,
					message: '请输入开户人',
					trigger: 'change'
				}],
				bank: [{
					required: true,
					message: '请输入开户银行',
					trigger: 'change'
				}],
				bankSubBranch: [{
					required: true,
					message: '请填写开户支行',
					trigger: 'change'
				}],
				bankAccount: [{
					required: true,
					message: '请输入银行账号',
					trigger: 'change'
				}]
			},
			errorType: ['message'],
			
			typeData:[
				{ name: '日常费用', id: '1' },
				{ name: '保证金', id: '2' },
				{ name: '专家费', id: '3' },
				{ name: '总经办', id: '4' },
				{ name: '差旅费', id: '5' },
				{ name: '备用金', id: '6' },
				{ name: '采购', id: '7' },
				{ name: '招投标', id: '8' },
				{ name: '其他', id: '9' }
			],
			paymentNameData:[
				{ name: '现金', id: '1' },
				{ name: '银行', id: '2' }
			],
			bankUserData:[],
			userId: this.$store.getters.userInfo.id,
			associatedApplicationData:[], // 关联采购
    }
  },
  methods: {
		getTypeData(params) {
			let newVal = params[0].value
			this.$set(this.fromValiData, 'type', params[0].value)
			this.$set(this.fromValiData, 'typeName', params[0].label)
			if(newVal === '2' || newVal === '7'){
				this.rules.typeName[0].required = false
			}else if(newVal === '3') {
				
			}else if(newVal === '7') {
				
			}else{
				this.rules.typeName[0].required = true
			}
		},
		getAssociatedApplicationData(params) {
			this.fromValiData.associatedApplication = params[0].label
			this.fromValiData.associatedApplicationId = params[0].value
		},
		getPaymentNameData(params){
			let newVal = params[0].value
			if (newVal === '1') {
				this.isPayment = false
			}else if (newVal === '2') {
			  this.isPayment = true
			}
		},
		getBankUserData(params){
			
		},
		getTimeData(params,e) {
			this.fromValiData[e] = params.result
			this.$forceUpdate()
		},
		// 获取关联采购数据
		getPurchaseData() {
		  this.$u.api.purchaseApi.getPurchaseGetAdoptDataByUserId({ userId: this.userId }, this).then(res => {
				res.result.forEach(xdd => {
				  xdd.name = '编号:' + xdd.loanNumber + '金额:' + xdd.actualMoney
				})
		  	this.associatedApplicationData = res.result
		  })
		},
		// 获取开户人数据
		getUserBankInfo(){
			this.$u.api.homeApi.getAssetsMaintenanceGetDataByUserId({ userId: this.userId }, this).then(res => {
				res.result.forEach(xdd => {
          xdd.name = xdd.bankUserName
        })
				this.bankUserData = res.result
			})
		}
  },
  onLoad (params) {
  },
  onReady () {
		this.getUserBankInfo() // 获取开户人数据
		this.getPurchaseData() // 获取关联采购数据
		this.$refs.fromValiData.setRules(this.rules);
  },
	onNavigationBarButtonTap() {
		console.log(this.fromValiData)
		this.$refs.fromValiData.validate(valid => {
			if (valid) {
				console.log('111')
				console.log('验证通过')
				console.log('111')
				// let ids = {...this.fromValiData}
				// this.$store.dispatch('setIsShow',true)
				// let pages = getCurrentPages() // 当前页面
				// let beforePage = pages[pages.length - 2] //上一页
				// this.$u.api.clientTrackRecordApi.getCrmTrackAddOrModify(ids, this).then(res => {
				// 	// #ifdef H5
				// 	beforePage.$refs.tableRef.$refs.uToast.show({
				// 		title: '保存成功',
				// 		type: 'success',
				// 	})
				// 	beforePage.doSearch()
				// 	// #endif
				// 	// #ifndef H5
				// 	beforePage.$vm.$refs.tableRef.$refs.uToast.show({
				// 		title: '保存成功',
				// 		type: 'success',
				// 	})
				// 	beforePage.$vm.doSearch()
				// 	// #endif
				// 	uni.navigateBack();
					
				// })
			}
		});
	},
}
</script>

<style scoped lang="scss">

</style>
