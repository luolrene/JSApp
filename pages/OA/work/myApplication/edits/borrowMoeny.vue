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
			<u-form-item label="借款标题:" prop="customDescription">
				<my-form name="input" type="input" v-model="fromValiData.customDescription" placeholder="请输入借款标题"></my-form>
			</u-form-item>
			<u-form-item label="借款类别:" prop="typeName">
				<my-form v-model="fromValiData.typeName" name="select" type="select" :selectList="typeData"
					@confirm="getTypeData" placeholder="请选择借款类别"></my-form>
			</u-form-item>
			<u-form-item label="采购申请:" prop="associatedApplication" v-if="fromValiData.type==='7'">
				<my-form v-model="fromValiData.associatedApplication" name="select" type="select" :selectList="associatedApplicationData"
				@confirm="getAssociatedApplicationData" placeholder="请选择采购申请"></my-form>
			</u-form-item>
			<u-form-item label="合同号:" prop="contractNumber" v-if="fromValiData.type==='3'">
				<my-form name="input" type="input" v-model="fromValiData.contractNumber" placeholder="请输入合同号"></my-form>
			</u-form-item>
			<u-form-item label="合同金额:" prop="contractAmount" v-if="fromValiData.type==='3'">
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
			<u-form-item label="支付方式:" prop="paymentName">
				<my-form v-model="fromValiData.paymentName" name="select" type="select" :selectList="paymentNameData"
					@confirm="getPaymentNameData" placeholder="请选择支付方式"></my-form>
			</u-form-item>
			<u-form-item label="开户人:" prop="bankUserName" v-if="isPayment">
				<my-form v-if="bankUserSelect" v-model="fromValiData.bankUserName" name="select" type="select" :selectList="bankUserData"
					@confirm="getBankUserData" placeholder="请选择开户人"></my-form>
				<my-form v-else name="input" type="input" v-model="fromValiData.bankUserName" placeholder="请输入开户人"></my-form>
				<span class="iconfont" @click="changeBankUser">&#xeca7;</span>
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
			bankUserSelect:true,
			fromValiData:{
				payment:'2',
				paymentName:'银行',
				mobilePhone: this.$store.getters.userInfo.mobile,
				name: this.$store.getters.userInfo.name,
				userId: this.$store.getters.userInfo.id,
				groupName: this.$store.getters.userInfo.groupName,
				groupId: this.$store.getters.userInfo.groupId
			},
			rules: {
				typeName: [{
					required: true,
					message: '请选择借款类别',
					trigger: 'change'
				}],
				contractNumber: [{
					required: false,
					message: '请填写合同号',
					trigger: 'change'
				}],
				contractAmount: [{
					required: false,
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
				associatedApplication: [{
					required: false,
					message: '请选择或填写采购申请',
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
				bankUserName: [{
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
				}],
				exp: [{
					required: false,
					message: '请输入备注',
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
		//切换借款类别
		getTypeData(params) {
			let newVal = params[0].value
			this.$set(this.fromValiData, 'type', params[0].value)
			this.$set(this.fromValiData, 'typeName', params[0].label)
			// 先重置所有的验证 然后再根据选择借款类别去处理
			this.rules.exp[0].required = false
			this.rules.contractNumber[0].required = false
			this.rules.contractAmount[0].required = false
			this.rules.associatedApplication[0].required = false
			delete this.fromValiData.contractNumber
			delete this.fromValiData.contractAmount
			delete this.fromValiData.associatedApplicationId
			delete this.fromValiData.associatedApplication
			// 根据借款类别对应的处理验证
			if(newVal === '2'){
				this.rules.exp[0].required = true
			}else if(newVal === '3') {
				this.rules.contractNumber[0].required = true
				this.rules.contractAmount[0].required = true
			}else if(newVal === '7') {
				this.rules.associatedApplication[0].required = true
				this.rules.exp[0].required = true
			}
		},
		getAssociatedApplicationData(params) {
			this.$set(this.fromValiData, 'associatedApplicationId', params[0].value)
			this.$set(this.fromValiData, 'associatedApplication', params[0].label)
		},
		getPaymentNameData(params){
			let newVal = params[0].value
			// 1是现金 2是银行 选择银行的话需要填写开户人等信息
			if (newVal === '1') {
				this.isPayment = false
			}else if (newVal === '2') {
			  this.isPayment = true
			}
			this.$set(this.fromValiData, 'payment', params[0].value)
			this.$set(this.fromValiData, 'paymentName', params[0].label)
		},
		getBankUserData(params){
			let obj = this.bankUserData.find(xdd=>{
				return xdd.id = params[0].value
			})
			// 根据选择的开户人 自动赋值信息
			this.$set(this.fromValiData, 'bankUser', params[0].value)
			this.$set(this.fromValiData, 'bankUserName', params[0].label)
			this.$set(this.fromValiData, 'bank', obj.bankName)
			this.$set(this.fromValiData, 'bankSubBranch', obj.bankSubBranch)
			this.$set(this.fromValiData, 'bankAccount', obj.bankNumber)
		},
		// 切换开户人的选择方式是下拉框还是input自己填
		changeBankUser(){
			this.bankUserSelect = !this.bankUserSelect
			delete this.fromValiData.bankUser
			delete this.fromValiData.bankUserName
			delete this.fromValiData.bank
			delete this.fromValiData.bankSubBranch
			delete this.fromValiData.bankAccount
		},
		getTimeData(params,e) {
			this.fromValiData[e] = params.result
			this.$forceUpdate()
		},
		// 获取关联采购数据
		getPurchaseData() {
		  this.$u.api.purchaseApi.getPurchaseGetAdoptDataByUserId({ userId: this.userId }, this).then(res => {
				res.result.forEach(xdd => {
					// actualMoney 实际金额
					if(xdd.actualMoney === null){
						xdd.actualMoney = '未填'
					}
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
		this.$refs.fromValiData.validate(valid => {
			if (valid) {
				let ids = {...this.fromValiData}
				this.$store.dispatch('setIsShow',true)
				let pages = getCurrentPages() // 当前页面
				let beforePage = pages[pages.length - 2] //上一页
				this.$u.api.myApplicationApi.getFinanceLoanAdd(ids, this).then(res => {
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
