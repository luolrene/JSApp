<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='180'
			class="my-edit">
			<u-form-item label="项目名称:" prop="project">
				<my-form name="input" type="input" v-model="fromValiData.project" placeholder="请输入项目名称"></my-form>
			</u-form-item>
			<u-form-item label="客户名称：" prop="custName">
				<u-input v-model="fromValiData.custName" type="input" placeholder="请选择产品" @confirm="searchProduct" />
				<view slot="right">
					<u-icon size="40" name="search" color="#2979ff" @click="searchProduct" />
				</view>
			</u-form-item>
			<u-form-item label="客户区域:" prop="area" v-show="fromValiData.area !==''">
				<my-form name="input" type="input" v-model="fromValiData.area" :disabled="true"></my-form>
			</u-form-item>
			<u-form-item label="联系人姓名:" prop="contacts">
				<my-form v-model="fromValiData.contacts" name="select" type="select" selectValue="mobile"
					:selectList="contactsList" @confirm="getContactsData" placeholder="请选择联系人姓名"></my-form>
			</u-form-item>
			<u-form-item label="联系人手机:" prop="contactsMobile" v-show="fromValiData.contactsMobile !==''">
				<my-form name="input" type="input" v-model="fromValiData.contactsMobile" :disabled="true"></my-form>
			</u-form-item>
			<u-form-item label="经办人姓名:" prop="sellerName">
				<my-form v-model="fromValiData.sellerName" name="select" type="select" selectValue="mobile"
					:selectList="sellerList" @confirm="getSellerData" placeholder="请选择经办人姓名"></my-form>
			</u-form-item>
			<u-form-item label="经办人手机:" prop="seller" v-show="fromValiData.seller !==''">
				<my-form name="input" type="input" v-model="fromValiData.seller" :disabled="true"></my-form>
			</u-form-item>
			<u-form-item label="内勤姓名:" prop="officeName" v-show="fromValiData.officeName !==''">
				<my-form name="input" type="input" v-model="fromValiData.officeName" :disabled="true"></my-form>
			</u-form-item>
			<u-form-item label="内勤手机:" prop="office" v-show="fromValiData.office !==''">
				<my-form name="input" type="input" v-model="fromValiData.office" :disabled="true"></my-form>
			</u-form-item>
			<!-- <u-form-item label="客户区域:" prop="area">
				<my-form v-model="fromValiData.area" name="select" type="selectCity" @confirm="getAreaData"
					placeholder="请选择客户区域"></my-form>
			</u-form-item> -->
			<u-form-item label="项目板块:" prop="plateName">
				<my-form v-model="fromValiData.plateName" name="select" type="select" :selectList="plateData"
					@confirm="getPlateData" placeholder="请选择项目板块"></my-form>
			</u-form-item>
			<u-form-item label="项目类型:" prop="projectType">
				<u-input type="select" :select-open="projectTypeShow" v-model="fromValiData.projectTypeName"
					placeholder="请选择项目类型" @click="getProjectTypeShow"></u-input>
			</u-form-item>
			<u-form-item label="业务类别:" prop="busiTypeName">
				<my-form v-model="fromValiData.busiTypeName" name="select" type="select" :selectList="busiTypeData"
					@confirm="getBusiTypeData" placeholder="请选择项目板块"></my-form>
			</u-form-item>
			<u-form-item label="付款方式:" prop="payTypeName">
				<my-form v-model="fromValiData.payTypeName" name="select" type="select" :selectList="payTypeData"
					@confirm="getPayTypeData" placeholder="请选择付款方式"></my-form>
			</u-form-item>
			<u-form-item label="寄送方式:" prop="mailTypeName">
				<my-form v-model="fromValiData.mailTypeName" name="select" type="select" :selectList="mailTypeData"
					@confirm="getMailTypeData" placeholder="请选择寄送方式"></my-form>
			</u-form-item>
		<!-- 	<u-form-item label="审核流程:" prop="checkPathName">
				<my-form v-model="fromValiData.checkPathName" name="select" type="select" :selectList="checkPathData"
					@confirm="getCheckPathData" placeholder="请选择审核流程"></my-form>
			</u-form-item> -->

			<u-form-item label="是否周期合同:" prop="iscycle" :label-width='200'>
				<u-switch v-model="fromValiData.iscycle"></u-switch>
			</u-form-item>
			<u-form-item label="是否分包:" prop="istosub" :label-width='200'>
				<u-switch v-model="fromValiData.istosub"></u-switch>
			</u-form-item>
			<u-form-item label="是否评价:" prop="ispj" :label-width='200'>
				<u-switch v-model="fromValiData.ispj"></u-switch>
			</u-form-item>
			<u-form-item label="是否需要寄出发票:" prop="needInvoice" :label-width='280'>
				<u-switch v-model="fromValiData.needInvoice"></u-switch>
			</u-form-item>

			<u-form-item label="采样期限时间:" prop="cyTerm" :label-width='200'>
				<my-form v-model="fromValiData.cyTerm" name="select" type="date" @confirm="getTimeData($event, 'cyTerm')"
					placeholder="请选择采样期限时间"></my-form>
			</u-form-item>
			<u-form-item label="项目期限:" prop="proTerm">
				<my-form v-model="fromValiData.proTerm" name="select" type="date" @confirm="getTimeData($event, 'proTerm')"
					placeholder="请选择项目期限"></my-form>
			</u-form-item>
			<u-form-item label="合同金额:" prop="price">
				<my-form name="input" type="input" v-model="fromValiData.price" placeholder="请输入合同金额"></my-form>
			</u-form-item>
			<u-form-item label="报告份数:" prop="reportNum">
				<my-form name="input" type="input" v-model="fromValiData.reportNum" placeholder="请输入报告份数"></my-form>
			</u-form-item>
			<u-form-item label="检测地点:" prop="checkAddress">
				<my-form name="input" type="input" v-model="fromValiData.checkAddress" placeholder="请输入检测地点"></my-form>
			</u-form-item>
			<u-form-item label="备注1:">
				<my-form name="input" type="input" v-model="fromValiData.expOne" placeholder="请填写备注1(全流程都能查看到该备注)"></my-form>
			</u-form-item>
			<u-form-item label="备注2:">
				<my-form name="input" type="input" v-model="fromValiData.expTwo" placeholder="请填写备注1(仅有权限的人能够查看)"></my-form>
			</u-form-item>
<!-- 			<u-form-item label="附件上传:" v-if="this.fromValiData.id !== null">
				<my-upload :id="this.fromValiData.id" @upSuccess="upSuccess" ref="myUpload"></my-upload>
			</u-form-item>
			<u-form-item label="已上传附件列表:" :label-width='130' v-if="this.fromValiData.id !== null">
				<view style="flex-direction: column;width: 100%;padding-right: 10rpx;">
					<u-row gutter="16" v-for="(item,index) in fileList" :key="index">
						<u-col span="11">
							<view @click="handlePreview(item,'detail')">{{index + 1}}. {{item.loadName}}</view>
						</u-col>
						<u-col span="1">
							<u-icon name="close" size="16" @click="handlePreview(item,'del')"></u-icon>
						</u-col>
					</u-row>
				</view>
			</u-form-item> -->

			<!-- 项目类型选择器 -->
			<u-popup v-model="projectTypeShow" mode="center" :mask-close-able="false" :border-radius="20"
				:closeable="true" width="80%">
				<view style="padding: 40rpx;">
					<u-checkbox-group @change="changeProjectType"
						style="display: flex;justify-content: center;flex-direction: column;">
						<u-checkbox style="line-height: 70rpx;" v-model="item.checked"
							v-for="(item, index2) in projectTypeData" :key="index2" :name="item.name">{{item.name}}
						</u-checkbox>
					</u-checkbox-group>
					<view style="display: flex;margin-top: 20rpx;">
						<u-button size="mini" @click="projectTypeShow = false">取消</u-button>
						<u-button type="primary" size="mini" @click="onSubmit">确认</u-button>
					</view>
				</view>
			</u-popup>
			<!-- 客户名称选择器 -->
			<u-select v-model="custSelectShow" :list="custList" @confirm="getCustData" value-name="id" label-name="name" />

			<u-toast ref="uToast" :duration="1000"/>
		</u-form>
	</my-pagge>
</template>

<script>
	export default {
		props: {
			layerid: ''
		},
		data() {
			return {
				isShow: false,
				fromValiData: {
					workType: '1',
					needCheck: '1',
					contacts: '',
					contactsMobile: '',
					seller: '',
					sellerName: '',
					office: '',
					officeName: '',
					iscycle: false,
					istosub: false,
					ispj: false,
					needInvoice: false,
					cyTerm: '',
					proTerm: '',
					project: '',
					projectTypeName: '',
					payTypeName: '',
					mailTypeName: '',
					busiType: '',
					busiTypeName: '',
					// checkPathName: '',
					plateName: '',
					projectType: '',
					area: '',
					custId: '',
					custName: '',
					id: null
				},
				rules: {
					project: [{
						required: true,
						message: '请填写项目名称',
						trigger: 'change'
					}],
					custName: [{
						required: true,
						message: '请选择客户名称',
						trigger: 'change'
					}],
					contacts: [{
						required: true,
						message: '请选择联系人姓名',
						trigger: 'change'
					}],
					sellerName: [{
						required: true,
						message: '请选择经办人姓名',
						trigger: 'change'
					}],
					plateName: [{
						required: true,
						message: '请选择项目板块',
						trigger: 'change'
					}],
					projectType: [{
						required: true,
						message: '请选择项目类型',
						trigger: 'change'
					}],
					payTypeName: [{
						required: true,
						message: '请选择付款方式',
						trigger: 'change'
					}],
					mailTypeName: [{
						required: true,
						message: '请选择寄送方式',
						trigger: 'change'
					}],
					checkPathName: [{
						required: true,
						message: '请选择审核流程',
						trigger: 'change'
					}],
					price: [{
						required: true,
						message: '请输入合同金额'
					}, {
						validator: (rule, value, callback) => {
							// this.$u.test.mobile()就是返回true或者false的
							let numberReg = /^\d+$|^\d+[.]?\d+$/
							if (value !== '') {
							  if (!numberReg.test(value)) {
							    callback(new Error('请输入数字'))
							  } else {
							    if (this.fromValiData.custType === '1' && value > 1000) {
							      callback(new Error('客户性质为个人，合同金额最大限额为1000'))
							    }
							    callback()
							  }
							} else {
							  // callback(new Error('请输入值'))
							  callback()
							}
						},
					}],
					checkAddress: [{
						required: true,
						message: '请填写检测地点',
						trigger: 'change'
					}],
					reportNum: [{
						required: true,
						message: '请输入报告份数'
					}, {
						required: true,
						type: 'number',
						message: '报告份数必须为数字',
						trigger: 'change'
					}],
				},
				errorType: ['message'],

				custList: [], // 客户数据
				contactsShow: false, // 联系人
				contactsList: [],
				sellerShow: false, // 经办人
				sellerList: [],

				custSelectShow: false,	//客户名称
				plateData: [], // 项目板块
				projectTypeData: [], // 项目类型
				allProjectTypeData:[], // 完整项目类型数据
				busiTypeData:[
					{id: '1', name: '纯检测'},
					{id: '2', name: '纯咨询'},
					{id: '3', name: '检测和咨询'}
				], // 业务类别
				projectTypeShow:false,
				projectTypeValue: [],
				payTypeData: [], // 付款方式
				mailTypeData: [], // 寄送方式
				// checkPathData: [], //审核流程

				// fileList: [], //文件列表
			}
		},
		watch:{
			'fromValiData.custName':{
				deep:true,
				immediate: true,
				handler(newV,oldV){
					if(newV === ''){
						this.fromValiData.area = ''
						this.fromValiData.contacts = ''
						this.fromValiData.contactsMobile = ''
						this.fromValiData.sellerName = ''
						this.fromValiData.seller = ''
						this.fromValiData.officeName = ''
						this.fromValiData.office = ''
					}
				}
			}
		},
		methods: {
			// 模糊搜索
			searchProduct() {
				let ids = {}
				ids.pageSize = 9999
				ids.pageNow = 1
				ids.name = this.fromValiData.custName
				//客户名称
				this.$u.api.clientInfoApi.getCustQueryPageData(ids, this).then(res => {
					this.custList = res.result.pageList
					this.custSelectShow = true
				})
			},
			getCustData(params) {
				let obj = {}
				obj = this.custList.find(xdd =>{
					return xdd.id === params[0].value
				})
				this.fromValiData.area = obj.province + '/' + obj.city + '/' + obj.area
				
				this.fromValiData.custType = obj.type
				this.fromValiData.custId = params[0].value
				this.fromValiData.custName = params[0].label
				this.fromValiData.contactsMobile = ''
				this.fromValiData.contacts = ''
				this.fromValiData.sellerName = ''
				this.fromValiData.seller = ''
				this.fromValiData.officeName = ''
				this.fromValiData.office = ''
				this.getUserData(params[0].value)
			},
			// upSuccess(res) {
			// 	if (res.code === 0) {
			// 		uni.showToast({
			// 			title: '上传成功',
			// 			icon: 'none'
			// 		})
			// 		this.getFileList()
			// 	}
			// },
			// handlePreview(params, type) {
			// 	if (type === 'detail') {
			// 		uni.navigateTo({
			// 			url: './my-preview?params=' + JSON.stringify(params) + '&that=' + this
			// 		})
			// 	} else if (type === 'del') {
			// 		let that = this
			// 		uni.showModal({
			// 			title: '提示',
			// 			content: '此操作将删除附件，是否继续？',
			// 			success(res) {
			// 				if (res.confirm) {
			// 					that.$u.api.commonApi.getFileDelFile({
			// 						fileId: params.id,
			// 						type: '1'
			// 					}, that).then(res => {
			// 						uni.showToast({
			// 							title: '删除成功',
			// 							icon: 'none'
			// 						})
			// 						that.getFileList()
			// 					})
			// 				}
			// 			}
			// 		})
			// 	}
			// },
			onSubmit() {
				this.fromValiData.projectTypeName = ''
				this.fromValiData.projectType = ''
				this.projectTypeData.forEach(xdd => {
					this.projectTypeValue.forEach(arc => {
						if (arc === xdd.name) {
							this.fromValiData.projectTypeName += xdd.name + ','
							this.fromValiData.projectType += xdd.id + ','
						}
					})
				})
				this.fromValiData.projectTypeName = this.fromValiData.projectTypeName.substring(0, this.fromValiData
					.projectTypeName.length - 1)
				this.fromValiData.projectType = this.fromValiData.projectType.substring(0, this.fromValiData.projectType
					.length - 1)
				this.projectTypeShow = false
			},
			// 点击项目类型进行选择的时候
			getProjectTypeShow() {
				this.projectTypeValue = this.fromValiData.projectTypeName.split(',')
				for (let i = 0; i < this.projectTypeData.length; i++) {
					for (let a = 0; a < this.projectTypeValue.length; a++) {
						if (this.projectTypeValue[a] === this.projectTypeData[i].name) {
							this.projectTypeData[i].checked = true
							break
						} else {
							this.projectTypeData[i].checked = false
						}
					}
				}
				this.projectTypeShow = true
			},
			// 项目类型数据改变时
			changeProjectType(params) {
				this.projectTypeValue = params
			},
			getUserData(custId) {
				let ids = {}
				ids.custId = custId
				this.$u.api.clientInfoApi.getCustQueryContacts(ids, this).then(res => {
					if(res.result.length === 0){
						this.$refs.uToast.show({
							title: '当前客户下无联系人',
							type: 'warning',
						})
					}
					this.contactsList = res.result
				})
			},
			getContactsData(params) {
				if (params[0].value) {
					let obj = {}
					obj = this.contactsList.find(xdd=>{
						return xdd.mobile === params[0].value
					})
					
					this.fromValiData.contactsMobile = params[0].value
					this.fromValiData.contacts = params[0].label
					this.fromValiData.sellerName = ''
					this.fromValiData.seller = ''
					this.fromValiData.office = ''
					this.fromValiData.officeName = ''
					
					this.$u.api.clientInfoApi.getCustQueryOpers({custId: obj.custId,contactsId: obj.id}, this).then(res2 => {
						if(res2.result.length === 0){
							this.$refs.uToast.show({
								title: '当前客户下无经办人',
								type: 'warning',
							})
						}
						this.sellerList = res2.result
					})
				}
			},
			getSellerData(params) {
				if (params[0].value) {
					this.fromValiData.seller = params[0].value
					this.fromValiData.sellerName = params[0].label
					this.fromValiData.office = ''
					this.fromValiData.officeName = ''

					this.$u.api.msgApi.getContractGetBackOfficeUser({
						seller: params[0].value
					}, this).then(res => {
						if (res.result) {
							this.fromValiData.office = res.result.mobile
							this.fromValiData.officeName = res.result.name
						} else {
							this.fromValiData.office = '无内勤人员'
							this.fromValiData.officeName = '无内勤人员'
						}
					})
				}
			},
			// 项目板块
			getPlateData(params) {
				this.projectTypeData = []
				this.allProjectTypeData.forEach(xdd => {
				  if (params[0].value === 'XMBK_2') {
				    if (xdd.id === 'XMLX_7' || xdd.id === 'XMLX_8') {
				      this.projectTypeData.push(xdd)
				    }
				  } else {
				    if (xdd.id !== 'XMLX_7' && xdd.id !== 'XMLX_8') {
				      this.projectTypeData.push(xdd)
				    }
				  }
				})
				this.fromValiData.plate = params[0].value
				this.fromValiData.plateName = params[0].label
				this.fromValiData.projectType = ''
				this.fromValiData.projectTypeName = ''
			},
			// 项目类型
			getProjectTypeData(params) {
				this.fromValiData.projectType = params[0].value
				this.fromValiData.projectTypeName = params[0].label
			},
			// 业务类别
			getBusiTypeData(params){
				this.fromValiData.busiType = params[0].value
				this.fromValiData.busiTypeName = params[0].label
				this.$forceUpdate()
			},
			// 付款方式
			getPayTypeData(params) {
				this.fromValiData.payType = params[0].value
				this.fromValiData.payTypeName = params[0].label
			},
			// 寄送方式
			getMailTypeData(params) {
				this.fromValiData.mailType = params[0].value
				this.fromValiData.mailTypeName = params[0].label
			},
			// // 审核流程
			// getCheckPathData(params) {
			// 	this.fromValiData.checkPath = params[0].value
			// 	this.fromValiData.checkPathName = params[0].label
			// },
			// 日期赋值
			getTimeData(params,e) {
				this.fromValiData[e] = params.result
				this.$forceUpdate()
			},
			// //获取附件列表
			// getFileList() {
			// 	this.$u.api.commonApi.getFileQueryFileList({
			// 		id: this.fromValiData.id,
			// 		type: '1'
			// 	}, this).then(res => {
			// 		this.fileList = res.result
			// 	})
			// }
		},
		onLoad(params) {
			// this.checkPathData = params.checkPathData ? JSON.parse(params.checkPathData) : []
			this.plateData = params.plateData ? JSON.parse(params.plateData) : []
			this.allProjectTypeData = params.projectTypeData ? JSON.parse(params.projectTypeData) : []
			this.payTypeData = params.payTypeData ? JSON.parse(params.payTypeData) : []
			this.mailTypeData = params.mailTypeData ? JSON.parse(params.mailTypeData) : []
			if (params.params) {
				this.fromValiData = JSON.parse(params.params)
				this.fromValiData.iscycle = this.fromValiData.iscycle === '1'
				this.fromValiData.istosub = this.fromValiData.istosub === '1'
				this.fromValiData.ispj = this.fromValiData.ispj === '1'
				this.fromValiData.needInvoice = this.fromValiData.needInvoice === '1'
				
				if(this.fromValiData.busiType === '1'){
					this.fromValiData.busiTypeName = "纯检测"
				}else if(this.fromValiData.busiType === '2'){
					this.fromValiData.busiTypeName = "纯咨询"
				}else if(this.fromValiData.busiType === '3'){
					this.fromValiData.busiTypeName = "检测和咨询"
				}
			}
			// this.getFileList()
		},
		onReady() {
			this.$refs.fromValiData.setRules(this.rules);
		},
		onNavigationBarButtonTap() {
			this.$refs.fromValiData.validate(valid => {
				if (valid) {
					let ids = JSON.parse(JSON.stringify(this.fromValiData))
					ids.iscycle = ids.iscycle ? '1' : '0'
					ids.istosub = ids.istosub ? '1' : '0'
					ids.ispj = ids.ispj ? '1' : '0'
					ids.needInvoice = ids.needInvoice ? '1' : '0'
					ids.office = ids.office === '无内勤人员' ? '' : ids.office
					ids.officeName = ids.officeName === '无内勤人员' ? '' : ids.officeName
					this.$store.dispatch('setIsShow', true)
					this.$u.api.msgApi.getContractAddOrModifyContract(ids, this).then(res => {
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
