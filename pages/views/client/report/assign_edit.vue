<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="报告主题:" prop="reportName">
				<my-form name="input" type="input" v-model="fromValiData.reportName" placeholder="请输入报告主题"></my-form>
			</u-form-item>
			<u-form-item label="备注:" prop="remarks">
				<my-form name="input" type="input" v-model="fromValiData.remarks" placeholder="请输入备注"></my-form>
			</u-form-item>
			<u-form-item label="下发用户名称:" prop="submitUserName" :label-width="200">
				<u-input
					v-model="fromValiData.submitUserName"
					type="textarea"
					:disabled="true"
					@click="handleUser"
					placeholder="请选择下发用户名称"/>
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
			disabled:false,
			fromValiData:{
				reportName:'',
				remarks:'',
				submitUserName:'',
				submitUser:''
			},
			rules: {
				reportName: [{
					required: true,
					message: '请填写报告名称',
					trigger: 'change'
				}],
				remarks: [{
					required: true,
					message: '请填写备注',
					trigger: 'change'
				}],
			},
			errorType: ['message'],
			
			allList:[],
			checkList:[]
    }
  },
  methods: {
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
				this.$u.api.clientReportApi.getCrmReportArrangementAddOrModify(this.fromValiData, this).then(res => {
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
