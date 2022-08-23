<!-- 销售统计 -->
<template>
	<view>
		<my-search
		:fromValiData="fromValiData"
		:obj="this"
		:data="searchData"
		:iconShow="true"
		:isInputShow="false"
		:placeholder="placeholder"
		:showAction="false"
		@handleSearchClick="handleSearchClick">
			<view class="modular">
				<view class="title">人员选择</view>
				<u-input
					v-model="fromValiData.userName"
					style="margin:0 40rpx"
					type="textarea"
					:disabled="true"
					@click="handleUser"
					placeholder="请选择人员"/>
			</view>
		</my-search>
		<my-pagge :isShow="isShow">
			<my-cell-group :data="gkList" title="概况统计"></my-cell-group>
		</my-pagge>
		<userPop ref="user" @getUserData="getUserData" :allList="allList" :checkList="checkList"></userPop>
		<tki-tree ref="tkitree" rangeKey="name" :selectParent="true" :range="industryList" confirmColor="#4e8af7" @confirm="getIndustryData"/>
	</view>
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
				userName:'',
				groupId:''
			},
			searchData:[
				{type:'date',name:'开始时间',prop:'timeStart',isShow:false},
				{type:'date',name:'结束时间',prop:'timeEnd',isShow:false},
				{type:'select',name:'时间段查询',prop:'time',data:[
					{id: '1', name: '本日'},
					{id: '2', name: '本周'},
					{id: '3', name: '本月'},
					{id: '4', name: '本年'}
				],active:null}
			],
			
			industryList:[], //部门数据
			placeholder:'',	//默认部门名称
			
			yearValue:'',	// 当前年份
			
			gkList:[],	// 概况统计
			
			allList:[],
			checkList:[]
    }
  },
	watch:{
		'fromValiData.groupId': {
		  deep: true,
		  handler: function(newV, oldV){
		  	this.allList = []  // 切换部门时 清空人员总数据
		  	this.checkList= []	// 切换部门时 清空选中的人员数据
		  	this.fromValiData.userIds = ''
		  	this.fromValiData.userMobile = ''
		  	this.fromValiData.userName = ''
		  }
		}
	},
  methods: {
		doSearch(){
			this.getGKList()
		},
		getGKList(){
			let ids = {}
			ids = JSON.parse(JSON.stringify(this.fromValiData))
			this.gkList = []
			this.$u.api.clientHomeApi.getCrmSysOutline(ids,this).then(res=>{
				res.result.forEach(xdd=>{
					this.gkList.push({
						title:xdd.name,
						value:xdd.crmSum
					})
				})
			})
		},
		// 获取部门数据
		getDeptData() {
			this.$u.api.clientHomeApi.getCrmSysDepartmentTree({},this).then(res=>{
				if (res.result.id) {
				  this.fromValiData.groupId = res.result.id
					this.placeholder = res.result.name
				}
				this.industryList.push(res.result)
				this.getUserListData(this.fromValiData.groupId)
				
				this.doSearch()
			})
		},
		// 打开部门选择器
		handleSearchClick(){
			this.$refs.tkitree._show()
		},
		// 部门选择确认按钮
		getIndustryData(params) {
			if(params.length > 0){
				this.fromValiData.groupId = params[0].id
				this.placeholder = params[0].name
				this.getUserListData(this.fromValiData.groupId)
				this.doSearch()
			}
		},
		// 打开人员选择器
		handleUser(){
			this.$refs.user.isShow = true
		},
		// 获取人员数据
		getUserListData(deptId){
			let ids ={}
			ids.deptId = deptId
			this.$u.api.clientHomeApi.getCrmSysGetUserAll(ids,this).then(res=>{
				this.allList = res.result
			})
		},
		getUserData(e){
			this.fromValiData.userIds = ''
			this.fromValiData.userMobile = ''
			this.fromValiData.userName = ''
			e.forEach(xdd=>{
				this.fromValiData.userIds += xdd.id + ','
				this.fromValiData.userMobile += xdd.mobile + ','
				this.fromValiData.userName += xdd.name + ','
			})
			this.fromValiData.userIds = this.fromValiData.userIds.substring(0,this.fromValiData.userIds.length - 1)
			this.fromValiData.userMobile = this.fromValiData.userMobile.substring(0,this.fromValiData.userMobile.length - 1)
			this.fromValiData.userName = this.fromValiData.userName.substring(0,this.fromValiData.userName.length - 1)
			console.log(this.fromValiData)
		},
		// 获取今年
		getYear () {
		  let date = new Date()
		  let y = date.getFullYear()
		  this.yearValue = y.toString()
		},
		// 获取当月
		getMonth () {
		  let date = new Date()
		  let y = date.getFullYear()
		  let m = date.getMonth() + 1
		  if (m < 10) {
		    m = '0' + m
		  }
		  this.fromValiData.targetTime = y + '-' + m
		  this.fromValiData.targetTimeEnd = y + '-' + m
		},
  },
  onLoad () {
		
  },
  onReady () {
		this.getYear()
		this.getMonth()
		this.getDeptData()
  }
}
</script>

<style scoped lang="scss">

</style>
