<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="报告名称:" prop="reportName">
				<my-form name="input" type="input" v-model="fromValiData.reportName" placeholder="请输入报告名称"></my-form>
			</u-form-item>
			<u-form-item label="报告类型:" prop="reportTypeName">
				<my-form v-model="fromValiData.reportTypeName" name="select" type="select" :selectList="reportTypeData"
					@confirm="getReportTypeData" placeholder="请选择报告类型"></my-form>
			</u-form-item>
			<u-form-item label="报告时间:" prop="reportTime">
				<my-form v-model="fromValiData.reportTime" name="select" type="date" @confirm="getTimeData($event, 'reportTime')"
					placeholder="请选择报告时间"></my-form>
			</u-form-item>
			<u-form-item label="抄送人" prop="submitUserName">
				<u-input
					v-model="fromValiData.submitUserName"
					type="textarea"
					:disabled="true"
					@click="handleUser"
					placeholder="请选择抄送人"/>
			</u-form-item>
			<u-form-item label="报告内容:" prop="reportContent">
				<my-form name="input" type="input" v-model="fromValiData.reportContent" placeholder="请输入报告内容"></my-form>
			</u-form-item>
			<userPop ref="user" @getUserData="getUserData" :allList="allList" :checkList="checkList"></userPop>
		</u-form>
	</my-pagge>
</template>

<script>
import userPop from '../../common/userPop.vue'
export default {
	components:{
		userPop
	},
  data () {
    return {
			isShow:false,
			
			fromValiData:{
				reportName:'',
				reportContent:'',
				reportType:'',
				reportTypeName:'',
				reportTime:'',
				submitUser:'',
				submitUserName:''
			},
			rules: {
				reportName: [{
					required: true,
					message: '请填写报告名称',
					trigger: 'change'
				}],
				reportTypeName: [{
					required: true,
					message: '请选择报告类型',
					trigger: 'change'
				}],
				reportTime: [{
					required: true,
					message: '请选择报告时间',
					trigger: 'change'
				}],
			},
			errorType: ['message'],
			reportTypeData:[
				{ id: '1', name: '日报' },
				{ id: '2', name: '周报' },
				{ id: '3', name: '月报' },
				{ id: '4', name: '季报' },
				{ id: '5', name: '年报' },
				{ id: '6', name: '其他' }
			],
			
			allList:[],
			checkList:[]
    }
  },
  methods: {
		// 报告类型
		getReportTypeData(params) {
			this.fromValiData.reportType = params[0].value
			this.fromValiData.reportTypeName = params[0].label
		},
		// 日期赋值
		getTimeData(params,e) {
			this.fromValiData[e] = params.result
			this.$forceUpdate()
		},
		handleUser(){
			this.$u.api.clientReportApi.getCrmReportArrangementGetGroupUser(this.fromValiData,this).then(res=>{
				res.result.forEach(xdd=>{
			 		xdd.id = xdd.userId
			 	})
				this.$refs.user.fromValiData.name = ''
				this.$refs.user.isShow = true
				this.allList = res.result
			})
		},
		getUserData(e){
			this.fromValiData.submitUser = ''
			this.fromValiData.submitUserName = ''
			e.forEach(xdd=>{
				this.fromValiData.submitUser += xdd.id + ','
				this.fromValiData.submitUserName += xdd.name + ',' 
			})
			this.fromValiData.submitUser = this.fromValiData.submitUser.substring(0,this.fromValiData.submitUser.length - 1)
			this.fromValiData.submitUserName = this.fromValiData.submitUserName.substring(0,this.fromValiData.submitUserName.length - 1)
			this.checkList = e
		}
  },
  onLoad (params) {
  	if(params.params){
  		this.fromValiData = JSON.parse(params.params)
			let submitUserName = {...this.fromValiData.submitUserName.split(',')}
			let submitUser = {...this.fromValiData.submitUser.split(',')}
			this.fromValiData.submitUserName.split(',').forEach((xdd,index) => {
				this.checkList.push({
					id:submitUser[index],
					name:xdd
				})
			})
  	}
  },
  onReady () {
		this.$refs.fromValiData.setRules(this.rules);
  },
	onNavigationBarButtonTap() {
		this.$refs.fromValiData.validate(valid => {
			if (valid) {
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientReportApi.getCrmReportAddOrModify(this.fromValiData, this).then(res => {
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
