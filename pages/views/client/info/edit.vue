<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="客户名称:" prop="name">
				<my-form name="input" type="input" v-model="fromValiData.name" placeholder="请输入客户名称" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="客户性质:" prop="typeName">
				<my-form v-model="fromValiData.typeName" name="select" type="select" :selectList="typeData"
					@confirm="getTypeData" placeholder="请选择客户性质" :disabled="disabled"></my-form>
			</u-form-item>
			<view
				v-show="fromValiData.type === '1'"
				style="color: #909399;display: flex;font-size: 14px;">
				<view style="color: #ff9900;">提示:</view>
				个人时,合同金额最大限额为1000元</view>
			<u-form-item label="社会统一信用代码:" prop="properlyCode" v-show="fromValiData.type !== '1'" :label-width="280">
				<u-input v-model="fromValiData.properlyCode" :disabled="typeDisabled"/>
			</u-form-item>
			<u-form-item label="上级客户:" prop="parentCustomerName">
				<my-form v-model="fromValiData.parentCustomerName" name="select" type="select" :selectList="parentCustomerData"
					@confirm="getParentCustomerData" placeholder="请选择上级客户" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="所在区域:" prop="areaData">
				<my-form
					v-model="fromValiData.areaData"
					name="select"
					type="selectCity"
					@confirm="getAreaData"
					placeholder="请选择所在区域"></my-form>
			</u-form-item>
			<u-form-item label="详细地址:" prop="address">
				<my-form name="input" type="input" v-model="fromValiData.address" placeholder="请输入详细地址"></my-form>
			</u-form-item>
			<u-form-item label="客户状态:" prop="customerTypeName">
				<my-form v-model="fromValiData.customerTypeName" name="select" type="select" :selectList="customerTypeData"
					@confirm="getCustomerTypeData" placeholder="请选择客户状态" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="客户级别:" prop="importantCustomersName" v-if="Number(this.$store.getters.userInfo.lev) >= 5 && this.fromValiData.id !== undefined">
				<my-form v-model="fromValiData.importantCustomersName" name="select" type="select" :selectList="importantCustomersData"
					@confirm="getImportantCustomersData" placeholder="请选择客户状态"></my-form>
			</u-form-item>
			<u-form-item label="客户行业:" prop="industryName">
				<u-input type="select" v-model="fromValiData.industryName"
					placeholder="请选择客户行业" @click="clickIustryShow" :class="{disabledClass:disabled}"></u-input>
			</u-form-item>
			<u-form-item label="联系人姓名:" prop="contactsName" :label-width='160' v-if="!fromValiData.id">
				<my-form name="input" type="input" v-model="fromValiData.contactsName" placeholder="请输入联系人姓名:"></my-form>
			</u-form-item>
			<u-form-item label="联系人电话:" prop="contactsMobile" :label-width='160' v-if="!fromValiData.id">
				<my-form name="input" type="input" v-model="fromValiData.contactsMobile" placeholder="请输入联系人电话:"></my-form>
			</u-form-item>
			<u-form-item label="联系人性别:" prop="sex" :label-width='160' v-if="!fromValiData.id">
				<my-form v-model="fromValiData.sex" name="select" type="select" :selectList="sexData"
					@confirm="getSexData" placeholder="请选择联系人性别"></my-form>
			</u-form-item>
			
			<u-form-item label="备注:">
				<my-form name="input" type="input" v-model="fromValiData.exp" placeholder="请输入备注:"></my-form>
			</u-form-item>
		
			<tki-tree ref="tkitree" rangeKey="name" :selectParent="true" :range="industryList" confirmColor="#4e8af7" @confirm="getIndustryData"/>
		</u-form>
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				disabled:false,
				fromValiData: {
					type:'4',
					typeName:'私有企业',
					parentCustomer:'',
					parentCustomerName:'',
					customerType:'',
					customerTypeName:'',
					industry:'',
					industryName:'',
					importantCustomers:'1',
					importantCustomersName:'',
					properlyCode:'',
					name:'',
					city:'',
					area:'',
					areaData:'',
					sex:''
				},
				rules: {
					name: [{
						required: true,
						message: '请填写客户名称',
						trigger: 'change'
					}],
					areaData: [{
						required: true,
						message: '请选择所在区域',
						trigger: 'change'
					}],
					industryName: [{
						required: true,
						message: '请选择所在行业',
						trigger: 'change'
					}],
					contactsName: [{
						required: true,
						message: '请填写联系人姓名',
						trigger: 'change'
					}],
					contactsMobile: [{
						required: true,
						message: '请填写联系人电话',
						trigger: ['change','blur'],
					},{
						validator: (rule, value, callback) => {
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.mobile(value);
						},
						message: '手机号码格式不正确',
						trigger: ['change','blur'],
					}],
					sex: [{
						required: true,
						message: '请选择联系人性别',
						trigger: 'change'
					}],
				},
				errorType: ['message'],
				areaShow: false,
				typeShow:false,
				typeDisabled:false,
				industryList: [],
				typeData:[
					{ name: '个人', id: '1' },
					{ name: '政府', id: '2' },
					{ name: '事业单位', id: '3' },
					{ name: '私有企业', id: '4' },
					{ name: '国有企业', id: '5' },
					{ name: '外资企业', id: '6' },
					{ name: '合资企业', id: '7' }
				],
				// 上级客户
				parentCustomerData:[],
				// 客户状态
				customerTypeData:[
					{ name: '已有订单', id: '1' },
					{ name: '从无订单', id: '2' },
					{ name: '订单中断', id: '3' }
				],
				importantCustomersData:[
					{ name: '普通客户', id: '1' },
					{ name: '重点客户', id: '2' },
					{ name: 'VIP客户', id: '3' }
				],
				sexData:[
					{id:'男',name:'男'},
					{id:'女',name:'女'},
				]
			}
		},
		methods: {
			getListData() {
				this.$u.api.clientInfoApi.getIndusQueryIndusTree({}, this).then(res => {
					this.assembleData(res.result)
					this.industryList = res.result
				})
				
				this.$u.api.clientInfoApi.getCustGetAllName({},this).then(res=>{
					this.parentCustomerData = res.result
				})
			},
			assembleData(data) {
				data.forEach(xdd => {
					if (xdd.children.length === 0) {
						delete xdd.children
					} else {
						this.assembleData(xdd.children)
					}
				})
			},
			clickIustryShow() {
				if(!this.disabled){
					this.$refs.tkitree._show()
				}
			},
			getIndustryData(params) {
				if(params.length > 0){
					this.fromValiData.industry = params[0].id
					this.fromValiData.industryName = params[0].name
				}
			},
			// 客户性质
			getTypeData(params) {
				this.fromValiData.type = params[0].value
				this.fromValiData.typeName = params[0].label
			},
			// 上级客户
			getParentCustomerData(params) {
				this.fromValiData.parentCustomer = params[0].value
				this.fromValiData.parentCustomerName = params[0].label
			},
			// 客户状态
			getCustomerTypeData(params) {
				this.fromValiData.customerType = params[0].value
				this.fromValiData.customerTypeName = params[0].label
				this.$forceUpdate()
			},
			// 客户级别
			getImportantCustomersData(params) {
				this.fromValiData.importantCustomers = params[0].value
				this.fromValiData.importantCustomersName = params[0].label
				this.$forceUpdate()
			},
			// 性别
			getSexData(params) {
				this.fromValiData.sex = params[0].value
			},
			getAreaData(params) {
				this.fromValiData.province = params.province.label
				this.fromValiData.city = params.city.label
				this.fromValiData.area = params.area.label
				this.fromValiData.areaData = this.fromValiData.province + '-' + this.fromValiData.city + '-' + this
					.fromValiData.area
				this.$forceUpdate()
			}
		},
		onLoad(params) {
			if(params.params){
				this.fromValiData = JSON.parse(params.params)
				this.disabled = true
				switch(this.fromValiData.customerType){
					case '1':
						this.fromValiData.customerTypeName = '已有订单'
						break
					case '2':
						this.fromValiData.customerTypeName = '从无订单'
						break
					case '3':
						this.fromValiData.customerTypeName = '订单中断'
						break
				}
				switch(this.fromValiData.type){
					case '1':
						this.fromValiData.typeName = '个人'
						break
					case '2':
						this.fromValiData.typeName = '政府'
						break
					case '3':
						this.fromValiData.typeName = '事业单位'
						break
					case '4':
						this.fromValiData.typeName = '私有企业'
						break
					case '5':
						this.fromValiData.typeName = '国有企业'
						break
					case '6':
						this.fromValiData.typeName = '外资企业'
						break
					case '7':
						this.fromValiData.typeName = '合资企业'
						break
				}
				switch(this.fromValiData.importantCustomers){
					case '1':
						this.fromValiData.importantCustomersName = '普通客户'
						break
					case '2':
						this.fromValiData.importantCustomersName = '重点客户'
						break
					case '3':
						this.fromValiData.importantCustomersName = 'VIP客户'
						break
				}
			}
		},
		onReady() {
			this.getListData()
			this.$refs.fromValiData.setRules(this.rules);
		},
		onNavigationBarButtonTap() {
			this.$refs.fromValiData.validate(valid => {
				if (valid) {
					if(this.fromValiData.type !== '1' && this.fromValiData.type !== '2' && this.fromValiData.type !== '3' && this.fromValiData.properlyCode === ''){
						uni.showToast({
							title: '请填写社会统一信用代码',
							duration: 2000,
							icon:'none'
						});
						return
					}
					let pages = getCurrentPages() // 当前页面
					let beforePage = pages[pages.length - 2] //上一页
					this.$store.dispatch('setIsShow',true)
					this.$u.api.clientInfoApi.getCustAddOrModifyCust(this.fromValiData, this).then(res => {
						if(res.code === 33){
							uni.showModal({
							    title: '提示',
							    content: '当前客户已存在，是否提交跟进客户申请',
							    success: params => {
							        if (params.confirm) {
												let ids = {}
												ids.id = res.result.id
												ids.name = res.result.name
												ids.properlyCode = res.result.properlyCode
												ids.contactsMobile = res.result.contactsMobile
												ids.contactsName = res.result.contactsName
												ids.sex = res.result.sex
							          this.$u.api.clientInfoApi.getCustResponsibility(ids, this).then(res2=>{
							          	// #ifdef H5
							          	beforePage.$refs.tableRef.$refs.uToast.show({
							          		title: '申请成功',
							          		type: 'success',
							          	})
							          	beforePage.doSearch()
							          	// #endif
							          	// #ifndef H5
							          	beforePage.$vm.$refs.tableRef.$refs.uToast.show({
							          		title: '申请成功',
							          		type: 'success',
							          	})
							          	beforePage.$vm.doSearch()
							          	// #endif
							          	uni.navigateBack();
							          })
							        }
							    }
							});
							return
						}
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
