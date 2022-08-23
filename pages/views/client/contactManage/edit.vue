<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" :rules="rules" ref="fromValiData" :error-type="errorType" :label-width='130'
			class="my-edit">
			<u-form-item label="联系人:" prop="name">
				<my-form name="input" type="input" v-model="fromValiData.name" :disabled="disabled" placeholder="请输入联系人"></my-form>
			</u-form-item>
			<u-form-item label="联系电话:" prop="mobile">
				<my-form name="input" type="input" v-model="fromValiData.mobile" :disabled="disabled" placeholder="请输入联系电话"></my-form>
			</u-form-item>
			<u-form-item label="联系人性别:" prop="sex" :label-width='160'>
				<my-form v-model="fromValiData.sex" name="select" type="select" :selectList="sexData"
					@confirm="getSexData" placeholder="请选择联系人性别"></my-form>
			</u-form-item>
			<u-form-item label="详细地址:" prop="addressDetailed">
				<my-form name="input" type="input" v-model="fromValiData.addressDetailed" placeholder="请输入详细地址"></my-form>
			</u-form-item>
			<u-form-item label="生日:" prop="birthday">
				<my-form name="select" type="date" v-model="fromValiData.birthday" @confirm="getBirthdayData" placeholder="请选择生日"></my-form>
			</u-form-item>
			<u-form-item label="部门:" prop="department">
				<my-form name="input" type="input" v-model="fromValiData.department" placeholder="请输入部门"></my-form>
			</u-form-item>
			<u-form-item label="职务:" prop="position">
				<my-form name="input" type="input" v-model="fromValiData.position" placeholder="请输入职务"></my-form>
			</u-form-item>
			<u-form-item label="爱好:" prop="hobby">
				<my-form name="input" type="input" v-model="fromValiData.hobby" placeholder="请输入爱好"></my-form>
			</u-form-item>
			<u-form-item label="备注:" prop="remarks">
				<my-form name="input" type="input" v-model="fromValiData.remarks" placeholder="请输入备注"></my-form>
			</u-form-item>
			<u-form-item label="家庭情况:" prop="familySituation">
				<my-form name="input" type="input" v-model="fromValiData.familySituation" placeholder="请输入家庭情况"></my-form>
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
				sex:'',
				birthday:''
			},
			rules: {
				name: [{
					required: true,
					message: '请填写联系人',
					trigger: 'change'
				}],
				mobile: [{
					required: true,
					message: '请填写联系电话',
					trigger: 'change'
				}],
				sex: [{
					required: true,
					message: '请选择联系人性别',
					trigger: 'change'
				}],
			},
			errorType: ['message'],
			sexData:[
				{id:'男',name:'男'},
				{id:'女',name:'女'},
			]
    }
  },
  methods: {
		getSexData(params){
			this.fromValiData.sex = params[0].value
		},
		// 生日
		getBirthdayData(params) {
			this.fromValiData.birthday = params.result
		},
  },
  onLoad (params) {
  	if(params.custId){
  		this.fromValiData.custId = params.custId
  	}else if(params.params){
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
				this.$store.dispatch('setIsShow',true)
				this.$u.api.clientContactManageApi.getCustAddOrModifyContacts(this.fromValiData, this).then(res => {
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
