<template>
	<my-pagge>
		<!-- 精英榜 -->
		<honor></honor>
		<view style="padding: 20rpx;">
			<view v-for="(item,index) in list" :key="index" style="margin-bottom: 30rpx;">
			<!-- <view v-for="(item,index) in list" :key="index" style="margin-bottom: 30rpx;" v-show="item.isShow"> -->
				<view style="display: flex;align-items: center;">
					<view style="width: 2rpx;;height: 40rpx;border: 2px solid #4D72E4;border-radius: 20px; margin-right: 10rpx;"></view>
					{{item.name}}
				</view>
				<u-row style="padding-bottom: 30rpx;">
					<u-col v-for="(xdd,index2) in item.data" :key="index2" class="cell" span="4" @click="handleToMenu(xdd.url)">
					<!-- <u-col v-for="(xdd,index2) in item.data" :key="index2" class="cell" span="4" @click="handleToMenu(xdd.url)" v-show="xdd.isShow"> -->
						<view class="btn">
							<view class="icon iconfont" style="font-size: 19px" :style="{color:index2 % 2 === 0 ? '#2071D9':'#E5621A'}">{{xdd.icon}}</view>
							<u-gap height="10"></u-gap>
							{{xdd.name}}
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<my-tabbar></my-tabbar>
	</my-pagge>
</template>

<script>
	import honor from './honor'
	export default {
		components:{
			honor
		},
		data() {
			return {
				list:[],
				list_all: [
					{name: '个人办公',col:3,path:'/work',data: [
							{name: '发起申请',url: 'pages/OA/work/myApplication/list', path:'/work/myApplication', icon:'\uec8a'},
							{name: '待我审批',url: 'pages/OA/work/myApprove/list', path:'/work/myApprove', icon:'\uec89'},
							{name: '任务中心',url: '', path:'/public/task', icon:'\ueca4'},
							{name: '通讯录',url: 'pages/OA/work/addressList/list', path:'/work/addressList', icon:'\ueca3'},
						]
					},
					// {name: '综合管理',col:1,path:'/integrated',data: [
					// 		{name: '资产管理',url: '',path:'', icon:'\ueb62'},
					// 	]
					// },
					// {name: '财务管理',col:1,path:'/finance',data: [
					// 		{name: '采购管理',url: '',path:'', icon:'\ueb64'},
					// 	]
					// },
				],
			}
		},
		onShow() {
			// OA和TAS切换
			let that = this
			function getMenu(){
				that.$u.api.OAhomeApi.getSysRoleMenu('',that).then(res=>{
					// 菜单授权
					that.list_all.forEach(xdd=>{
						res.result.forEach(arc=>{
							if(xdd.path === arc.path){
								xdd.isShow = true
								xdd.data.forEach(num=>{
									arc.children.forEach(item=>{
										if(num.path === item.path){
											num.isShow = true
										}
									})
								})
							}
						})
					})
					that.list = that.list_all
				})
			}
			if(this.$store.getters.system === 'TAS'){
				this.$store.dispatch('setSystem', 'OA').then(res => {
					this.$u.api.homeApi.getUserGetUserInfoOA('', this).then(res=>{
						return res
					}).then(res=>{
						this.$store.dispatch('setUserInfo', res.result).then(res => {
							getMenu()
						})
					})
				})
			}
		},
		onLoad() {

		},
		methods: {
			handleToMenu(url){
				this.$u.route({
					url: url,
					params: {
						// name: '1'
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #3d444c;
		color: #ffffff;
	}
	.cell {
		display: flex;
		justify-content: center !important;
		align-items: center;
		margin-top: 50rpx;
	
		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			width: 150rpx;
			height: 150rpx;
			border-radius: 20rpx;
			font-size: 12rpx;
			background: #373d44;
			box-shadow: 5px 5px 10px #16181b,
				-5px -5px 10px #58626d;
		}
	}
</style>