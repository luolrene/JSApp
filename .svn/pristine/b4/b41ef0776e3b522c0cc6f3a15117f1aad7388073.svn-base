<template>
  <my-pagge>
    <my-cell-group :data="userList" title="基本信息"></my-cell-group>
		
		<my-preview :fileId="params.id"></my-preview>
  </my-pagge>
</template>

<script>
export default {
  data () {
    return {
			params:{}
    }
  },
  methods: {

  },
	computed:{
		userList(){
			return [
				{title:'客户名称',value:this.params.name},
				{title:'客户类别',value:this.params.typeName},
				{title:'社会统一信用代码',value:this.params.properlyCode},
				{title:'上级公司名称',value:this.params.parentCustomerName},
				{title:'所在地区',value:this.params.province + '-' + this.params.city + '-' + this.params.area},
				{title:'详细地址',value:this.params.address},
				{title:'客户状态',value:this.params.customerType},
				{title:'客户级别',value:this.params.importantCustomers},
				{title:'行业',value:this.params.industryName},
				{title:'创建时间',value:this.params.createTime},
				{title:'备注',value:this.params.exp}
			]
		}
	},
  onLoad(params) {
  	if (params.params) {
  		this.params = JSON.parse(params.params)
			switch(this.params.importantCustomers){
				case '1':
					this.params.importantCustomers = '普通客户'
					break;
				case '2':
					this.params.importantCustomers = '重点客户'
					break;
				case '3':
					this.params.importantCustomers = 'VIP客户'
					break;
			}
			switch(this.params.customerType){
				case '1':
					this.params.customerType = '已有订单'
					break;
				case '2':
					this.params.customerType = '从无订单'
					break;
				case '3':
					this.params.customerType = '订单中断'
					break;
			}
			switch(this.params.type){
				case '1':
					this.params.typeName = '个人'
					break;
				case '2':
					this.params.typeName = '政府'
					break;
				case '3':
					this.params.typeName = '事业单位'
					break;
				case '4':
					this.details.typeName = '私有企业'
					break;
				case '5':
					this.details.typeName = '国有企业'
					break;
				case '6':
					this.details.typeName = '外资企业'
					break;
				case '7':
					this.details.typeName = '合资企业'
					break;
			}
  	}
  },
  onReady () {
  	
  }
}
</script>

<style scoped lang="scss">

</style>
