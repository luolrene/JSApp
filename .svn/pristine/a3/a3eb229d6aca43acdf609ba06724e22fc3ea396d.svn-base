<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="目标开始月份:" prop="targetTime" :label-width='200'>
				<my-form v-model="fromValiData.targetTime" name="select" type="month" @confirm="getTimeData($event, 'targetTime')"
					placeholder="请选择目标开始月份" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="目标结束月份:" prop="targetTimeEnd" :label-width='200'>
				<my-form v-model="fromValiData.targetTimeEnd" name="select" type="month" @confirm="getTimeData($event, 'targetTimeEnd')"
					placeholder="请选择目标结束月份" :disabled="disabled"></my-form>
			</u-form-item>
			<u-form-item label="目标金额:" prop="targetQuota">
				<my-form name="input" type="input" v-model="fromValiData.targetQuota" placeholder="请输入目标金额"></my-form>
			</u-form-item>
			<u-form-item label="执行人:" prop="userName">
				<u-input
					v-model="fromValiData.userName"
					type="textarea"
					:disabled="true"
					@click="handleUser"
					placeholder="请选择执行人"
					:class="{userDisabled:disabled}"/>
		<!-- 		<u-input
					v-model="fromValiData.userName"
					type="textarea"
					:disabled="true"
					@click="handleUser"
					placeholder="请选择执行人"
					:class="{userDisabled:disabled}"/> -->
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
				targetTime:'',
				targetTimeEnd:'',
				targetQuota:'',
				userName:''
			},
			rules: {
				targetTime: [{
					required: true,
					message: '请选择目标开始月份',
					trigger: 'change'
				}],
				targetTimeEnd: [{
					required: true,
					message: '请选择目标结束月份',
					trigger: 'change'
				}],
				targetQuota: [{
					required: true,
					message: '请输入目标金额',
					trigger: 'change'
				},{
					required: true,
					type:'number',
					message: '目标金额必须为纯数字',
					trigger: 'change'
				}],
				userName: [{
					required: true,
					message: '请选择执行人',
					trigger: 'change'
				}],
			},
			errorType: ['message'],
			
			allList:[],
			checkList:[],
    }
  },
  methods: {
		// 日期赋值
		getTimeData(params,e) {
			this.fromValiData[e] = params.year + '-' + params.month
			this.$forceUpdate()
		},
		handleUser(){
			if(!this.disabled){
				this.$u.api.clientSellTargetApi.getCrmReportGetUser(this.fromValiData,this).then(res=>{
					this.$refs.user.isShow = true
					this.allList = res.result
				})
			}
		},
		getUserData(e){
			console.log(e)
			this.fromValiData.userName = ''
			e.forEach(xdd=>{
				this.fromValiData.userName += xdd.name + ',' 
			})
			this.fromValiData.userName = this.fromValiData.userName.substring(0,this.fromValiData.userName.length - 1)
			this.checkList = e
		}
  },
  onLoad (params) {
  	if(params.params){
  		this.fromValiData = JSON.parse(params.params)
  		this.disabled = true
  	}
  },
  onReady () {
		this.$refs.fromValiData.setRules(this.rules);
  },
	onNavigationBarButtonTap() {
		this.$refs.fromValiData.validate(valid => {
			if (valid) {
				let fyear = this.fromValiData.targetTime.substring(0,4)
				let lyear = this.fromValiData.targetTimeEnd.substring(0,4)
				let fmonth = this.fromValiData.targetTime.substring(5,7)
				let lmonth = this.fromValiData.targetTimeEnd.substring(5,7)
				if(lyear < fyear){
					uni.showToast({
						icon:'none',
						title:'结束月份必须大于开始月份'
					})
					return
				}else{
					if(lmonth < fmonth){
						uni.showToast({
							icon:'none',
							title:'结束月份必须大于开始月份'
						})
						return
					}
				}
				let ids = this.checkList.map(xdd=>{
					return {
						targetTime: this.fromValiData.targetTime,
						targetTimeEnd: this.fromValiData.targetTimeEnd,
						targetQuota:this.fromValiData.targetQuota,
						userId: xdd.id,
						userName: xdd.name
					}
				})
				this.$store.dispatch('setIsShow',true)
				
				this.$u.api.clientSellTargetApi.getCrmTargetAddOrModify(ids, this).then(res => {
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
				}).catch(error=>{
					
				})
			}
		});
	},
}
</script>

<style scoped lang="scss">
	
</style>
