<template>
	<my-pagge>
		<u-swiper :list="imgListData" class="my-padding-lr"></u-swiper>
		
		<u-gap height="20"></u-gap>
	
		<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" class="my-padding-lr"
			:is-scroll="false"></u-tabs-swiper>
	
		<u-gap height="10"></u-gap>
	
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="my-margin-lr"
			style="height: 64vh;background-color: #FFFFFF;">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y style="height: 100%;">
					<u-grid :col="item.col" @click="clickGrid">
						<u-grid-item v-for="(xdd,index2) in item.data" :index="xdd.url" :key="index2" v-if="xdd.isShow">
							<!-- <u-icon :name="xdd.icon" :size="46"></u-icon> -->
							<view class="icon iconfont" style="font-size: 19px;color: #4D72E4;margin-bottom: 4px;">{{xdd.icon}}</view>
							<view class="grid-text">{{xdd.name}}</view>
						</u-grid-item>
					</u-grid>
				</scroll-view>
			</swiper-item>
		</swiper>
		<my-tabbar></my-tabbar>
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					path:'/client',
					name: '客户管理',
				}, {
					path:'/contract',
					name: '合同管理',
				}, {
					path:'/sampling',
					name: '采样管理',
				}, {
					path:'/verity',
					name: '审核管理',
				}],
				current: 0,
				swiperCurrent: 0,
				tabs: [
					{name: '客户管理',col:3,path:'/client',data: [
							{name: '销售统计',url: 'pages/views/client/home/list', path:'/client/home', icon:'\ueba1'},
							{name: '客户信息',url: 'pages/views/client/info/list', path:'/client/info', icon:'\ueb67'},
							{name: '客联系人',url: 'pages/views/client/contactManage/list', path:'/client/contactManage', icon:'\ueb8e'},
							{name: '跟进记录',url: 'pages/views/client/trackRecord/list', path:'/client/trackRecord', icon:'\uec53'},
							{name: '访客计划',url: 'pages/views/client/visitorsToPlan/list', path:'/client/visitorsToPlan', icon:'\ueb7a'},
							{name: '销售机会',url: 'pages/views/client/salesLeads/list', path:'/client/salesLeads', icon:'\uec4b'},
							{name: '报价记录',url: 'pages/views/client/quotationRecord/list', path:'/client/quotationRecord', icon:'\ueb6a'},
							{name: '工作报告',url: 'pages/views/client/report/list', path:'/client/report', icon:'\ueb6f'},
							{name: '销售目标',url: 'pages/views/client/sellTarget/list', path:'/client/sellTarget', icon:'\ueca4'},
							// {name: '打印',url: 'pages/views/client/dayin', icon:'\ueca4'},
						]
					},
					{name: '合同管理',col:1,path:'/contract',data: [
							{name: '合同信息',url: 'pages/views/contract/msg/list',path:'/contract/msg'},
						]
					},
					{name: '采样管理',col:1,path:'/sampling',data: [
							{name: '样品交接',url: 'pages/views/sampling/reportTask/list',path:'/sampling/reportTask'},
						]
					},
					{name: '审核管理',col:1,path:'/verity',data: [
							{name: '合同信息审核',url: 'pages/views/verity/contractVerity/list',path:'/verity/contractVerity'},
							{name: '变更合同审核',url: 'pages/views/verity/changeCont/list',path:'/verity/changeCont'},
							{name: '报告任务审核',url: 'pages/views/verity/reportVerity/list',path:'/verity/reportVerity'},
						]
					},
				],

				imgListData: [
					{ image: '/static/home/lunbo_1.jpg'},
					{ image: '/static/home/lunbo_2.jpg'},
					{ image: '/static/home/lunbo_3.jpg'},
				],
				data_A:[],
				data_B:[]
			}
		},
		onShow() {
			// OA和TAS切换
			let that = this
			function getMenu(){
				that.data_A = []
				that.data_B = []
				that.$u.api.loginApi.getSysRoleMenu({}, that).then(res => {
					// 第一级菜单授权
					that.list.forEach((xdd,index)=>{
						res.result.forEach(arc=>{
							if(xdd.path === arc.path){
								that.data_A.push(xdd)
							}
						})
					})
					// 第二级菜单授权
					that.tabs.forEach(xdd=>{
						res.result.forEach(arc=>{
							if(xdd.path === arc.path){
								xdd.data.forEach(num=>{
									arc.children.forEach(item=>{
										if(num.path === item.path){
											num.isShow = true
										}
									})
								})
								that.data_B.push(xdd)
							}
						})
					})
					that.list = that.data_A
					that.tabs = that.data_B
				})
			}
			if(this.$store.getters.system === 'OA'){
				this.$store.dispatch('setSystem', 'TAS').then(res => {
					this.$u.api.homeApi.getUserGetUserInfoTAS('', this).then(res=>{
						return res
					}).then(res=>{
						this.$store.dispatch('setUserInfo', res.result).then(res => {
							getMenu()
						})
					})
					
				})
			}else{
				if(this.data_A.length === 0){
					getMenu()
				}
			}
			// #ifdef APP-PLUS
			//消息推送 首页铃铛数字
			let ids = {pageNow:1,pageSize:10,isRead:'0'}
			this.$u.api.homeApi.getMsgQueryPageList(ids, this).then(res => {
				let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					let currentWebview = page.$getAppWebview();  
				if(res.result.pageList.length > 0){
					currentWebview.showTitleNViewButtonRedDot({index:0}) 
				}else{
					currentWebview.hideTitleNViewButtonRedDot({index:0})  
				}
			})
			// #endif 
		},
		onLoad() {
			
		},
		methods: {
			clickGrid(params) {
				this.$u.route({
					url: params,
					params: {
						name: '1'
					}
				})
			},

			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'./push_list'
			})
		}
	}
</script>

<style scoped lang="scss">

</style>
