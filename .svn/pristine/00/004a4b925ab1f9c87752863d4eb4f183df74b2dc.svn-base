<template>
	<my-pagge :isShow="isShow">
		<my-cell-group :data="userList" title="用户信息"></my-cell-group>
		
		<my-cell-group :data="contractList" title="项目信息"></my-cell-group>
		
		<my-preview :fileId="params.id" fileType="1"></my-preview>
	</my-pagge>
</template>

<script>
export default {
	props:{
		params:Object,
		secret: {
		  type: Boolean,
		  default: false
		}
	},
  data () {
    return {
			isShow:false,
			
			userList:[
				{title:'联系人姓名',value:this.params.contacts},
				{title:'联系人手机',value:this.params.contactsMobile},
				{title:'经办人姓名',value:this.params.sellerName},
				{title:'经办人手机',value:this.params.seller},
				{title:'内勤姓名',value:this.params.officeName},
				{title:'内勤手机',value:this.params.office}
			],
			contractList:[
				{title:'项目名称',value:this.params.project},
				{title:'项目类型',value:this.params.projectTypeName},
				{title:'项目板块',value:this.params.plateName},
				{title:'客户名称',value:this.params.custName},
				{title:'客户区域',value:this.params.area},
				{title:'审核流程',value:this.params.checkPathName},
				
				{title:'付款方式',value:this.params.payTypeName},
				{title:'寄送方式',value:this.params.mailTypeName},
				{title:'报告份数',value:this.params.reportNum},
				
				{title:'是否周期合同',value:this.params.iscycle === '1' ? '是' : '否'},
				{title:'是否分包',value:this.params.istosub === '1' ? '是' : '否'},
				{title:'是否评价',value:this.params.ispj === '1' ? '是' : '否'},
				{title:'是否需要寄出发票',value:this.needInvoice === '1' ? '是' : '否'},
				
				{title:'采样期限时间',value:this.params.cyTerm},
				{title:'项目期限',value:this.params.proTerm},
				{title:'检测地点',value:this.params.checkAddress},
				
				{title:'合同状态',value:this.params.statusName},
				{title:'备注1',value:this.params.expOne},
				{title:'合同金额',value:this.params.price,isShow:this.secret},
				{title:'备注2',value:this.params.expTwo,isShow:this.secret}
			]
    }
  },
  methods: {
		
  },
  mounted () {
		
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
.u-cell{
	padding: 14rpx 30rpx;
}
</style>
