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
			<u-form-item label="跟进方式:" prop="trackMode">
				<my-form v-model="fromValiData.trackMode" name="select" type="select" :selectList="trackModeData"
					@confirm="getTrackModeData" placeholder="请选择跟进方式"></my-form>
			</u-form-item>
			<u-form-item label="拜访时间:" prop="trackTime">
				<my-form v-model="fromValiData.trackTime" name="select" type="date" @confirm="getTimeData($event, 'trackTime')"
					placeholder="请选择拜访时间"></my-form>
			</u-form-item>
			<u-form-item label="跟进内容:" prop="trackContent">
				<my-form name="textarea" type="textarea" v-model="fromValiData.trackContent" placeholder="请输入跟进内容"></my-form>
			</u-form-item>
			<u-form-item label="跟进结果:" prop="trackResult">
				<my-form name="textarea" type="textarea" v-model="fromValiData.trackResult" placeholder="请输入跟进结果"></my-form>
			</u-form-item>
			<u-form-item label="跟进位置:" prop="location">
				<my-form name="textarea" type="textarea" v-model="fromValiData.location" :disabled="true"></my-form>
			</u-form-item>
			
			<u-form-item label="是否下次跟进:" prop="track" :label-width='200'>
				<u-switch v-model="fromValiData.track"></u-switch>
			</u-form-item>
			<block v-if="fromValiData.track">
				<u-form-item label="下次跟进时间:" prop="time" :label-width='200'>
					<my-form v-model="fromValiData.time" name="select" type="date" @confirm="getTimeData($event, 'time')"
						placeholder="请选择下次跟进时间"></my-form>
				</u-form-item>
				<u-form-item label="下次提醒时间:" prop="nextTime" :label-width='200'>
					<my-form v-model="fromValiData.nextTime" name="select" type="date" @confirm="getTimeData($event, 'nextTime')"
						placeholder="请选择下次提醒时间"></my-form>
				</u-form-item>
				<u-form-item label="下次跟进备注:" prop="nextRemarks" :label-width='200'>
					<my-form name="textarea" type="textarea" v-model="fromValiData.nextRemarks" placeholder="请输入下次跟进备注"></my-form>
				</u-form-item>
			</block>
			<u-form-item label="关联销售机会:" prop="saleIdTwoName" :label-width='200' v-if="fromValiData.id === undefined">
				<my-form v-model="fromValiData.saleIdTwoName" name="select" type="select" :selectList="name1Data" selectLabel="opportunityName"
					@confirm="getName1Data" placeholder="请选择销售机会"></my-form>
			</u-form-item>
			<u-form-item label="发现销售机会:" prop="opportunity" :label-width='260' v-if="fromValiData.id === undefined">
				<u-switch v-model="fromValiData.opportunity"></u-switch>
			</u-form-item>
			<block v-if="fromValiData.opportunity && fromValiData.id === undefined">
				<u-form-item label="销售机会名称:" prop="opportunityName" :label-width='200'>
					<my-form name="input" type="input" v-model="fromValiData.opportunityName" placeholder="请输入销售机会名称"></my-form>
				</u-form-item>
				<u-form-item label="销售阶段:" prop="stageName">
					<my-form v-model="fromValiData.stageName" name="select" type="select" :selectList="stageData"
						@confirm="getStageData" placeholder="请选择销售阶段"></my-form>
				</u-form-item>
				<u-form-item label="项目板块:" prop="relation">
					<my-form name="input" type="input" v-model="fromValiData.relation" placeholder="请输入项目板块"></my-form>
				</u-form-item>
				<u-form-item label="预计金额:" prop="estimatedAmount">
					<my-form name="input" type="input" v-model="fromValiData.estimatedAmount" placeholder="请输入预计金额"></my-form>
				</u-form-item>
				<u-form-item label="预计结束日期:" prop="estimatedTime" :label-width='200'>
					<my-form v-model="fromValiData.estimatedTime" name="select" type="date" @confirm="getTimeData($event, 'estimatedTime')"
						placeholder="请选择预计结束日期"></my-form>
				</u-form-item>
			</block>
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
				trackMode:'',
				trackTime:'',
				track:false,
				time:'',
				nextTime:'',
				name1:'',
				saleIdTwo:'',
				location:''
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
				trackMode: [{
					required: true,
					message: '请选择跟进方式',
					trigger: 'change'
				}],
				trackTime: [{
					required: true,
					message: '请选择拜访时间',
					trigger: 'change'
				}],
				trackContent: [{
					required: true,
					message: '请输入跟进内容',
					trigger: 'change'
				}],
				trackResult: [{
					required: true,
					message: '请输入跟进结果',
					trigger: 'change'
				}],
				time: [{
					required: true,
					message: '请选择下次跟进时间',
					trigger: 'change'
				}],
				nextTime: [{
					required: true,
					message: '请选择下次提醒时间',
					trigger: 'change'
				}],
				opportunityName: [{
					required: true,
					message: '请输入销售机会名称',
					trigger: 'change'
				}],
				stageName: [{
					required: true,
					message: '请选择销售阶段',
					trigger: 'change'
				}],
				relation: [{
					required: true,
					message: '请选择项目板块',
					trigger: 'change'
				}],
				estimatedAmount: [{
					required: true,
					message: '请输入预计金额',
					trigger: 'change'
				},{
					required: true,
					type:'number',
					message: '金额必须为数字',
					trigger: 'change'
				}],
				estimatedTime: [{
					required: true,
					message: '请选择预计结束日期',
					trigger: 'change'
				}]
			},
			errorType: ['message'],
			
			custData:[],
			contactsData:[],
			trackModeData:[
				{ name: '当面拜访', id: '1' },
				{ name: '电话拜访', id: '2' }
			],
			stageData:[
				{ name: '发现需求', id: '1' },
				{ name: '确认需求', id: '2' },
				{ name: '商务谈判', id: '3' },
				{ name: '合同签订', id: '4' }
			],
			name1Data:[]
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
		getTrackModeData(params){
			this.fromValiData.trackMode = params[0].label
		},
		getStageData(params){
			this.fromValiData.stage = params[0].value
			this.fromValiData.stageName = params[0].label
			this.$forceUpdate()
		},
		getName1Data(params){
			this.fromValiData.saleIdTwo = params[0].value
			this.fromValiData.saleIdTwoName = params[0].label
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
			this.fromValiData.track = this.fromValiData.track === '1' ? true : false
			this.fromValiData.opportunity = this.fromValiData.opportunity === '1' ? true : false
			this.changeCust(this.fromValiData.custId)
		}else if(params.change){
			// this.fromValiData = JSON.parse(params.change)
			this.fromValiData = {...this.fromValiData,...JSON.parse(params.change)}
			this.fromValiData.id = undefined
			this.fromValiData.status = '2'
			this.fromValiData.name = this.fromValiData.custName
			this.fromValiData.contacts = this.fromValiData.contactsName
			this.fromValiData.trackPersonnel = this.$store.getters.userInfo.userId
			this.fromValiData.executorId = this.$store.getters.userInfo.userId
			this.changeCust(this.fromValiData.custId)
			this.disabled = true
			uni.setNavigationBarTitle({
				title:'跟进'
			})
		}else{
			this.fromValiData.trackPersonnel = this.$store.getters.userInfo.userId
		}
		this.getCustListData()
  },
  onReady () {
		uni.showLoading({
			mask:true,
			title: '获取地址信息中，请稍等...'
		});
		uni.getLocation({
		    type: 'gcj02',
				geocode: true,
				isHighAccuracy: true,
		    success: res => {
					let a = res.address
					this.fromValiData.location = a.province + '-' + a.city + '-' + a.district + '-' + a.street + a.streetNum + '-' + a.poiName
					uni.hideLoading();
		    }
		})
		this.$refs.fromValiData.setRules(this.rules);
  },
	onNavigationBarButtonTap() {
		this.$refs.fromValiData.validate(valid => {
			if (valid) {
				let ids = JSON.parse(JSON.stringify(this.fromValiData))
				ids.trackPersonnel = this.$store.getters.userInfo.userId
				if (!ids.track) {
				  ids.time = ' '
				  ids.nextTime = ' '
				  ids.nextRemarks = ' '
					ids.track = '2'
				}else{
					ids.track = '1'
				}
				if (!ids.opportunity) {
				  ids.stage = ' '
				  ids.opportunityName = ' '
				  ids.relation = ' '
				  ids.estimatedAmount = ' '
				  ids.estimatedTime = ' '
					ids.opportunity = '2'
				}else{
					ids.opportunity = '1'
				}
				this.$store.dispatch('setIsShow',true)
				let pages = getCurrentPages() // 当前页面
				let beforePage = pages[pages.length - 2] //上一页
				if (ids.opportunity === '1' && ids.id === undefined) {
				  this.$u.api.clientSalesLeadsApi.getCrmSaleOpportunityAddOrModify(ids, this).then(res => {
				  	ids.saleId = res.result
						this.$u.api.clientTrackRecordApi.getCrmTrackAddOrModify(ids, this).then(res => {
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
				  })
				} else {
				  this.$u.api.clientTrackRecordApi.getCrmTrackAddOrModify(ids, this).then(res => {
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
			}
		});
	},
}
</script>

<style scoped lang="scss">

</style>
