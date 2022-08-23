<template>
	<view>
		<view class="listOneButton" @click="addRemark">
			<span class="iconfont">&#xed24;</span>
		</view>
		<my-pagge :isShow="isShow">
			<my-list
				:obj="this"
				ref="tableRef"
				:tableData="tableData"
				:tableHeader="tableHeader"
				:loadStatus="loadStatus" 
				:scrollTop="scrollTop">
			</my-list>
		</my-pagge>
		
		<!-- 添加流程备注 -->
		<u-popup v-model="remarkShow" mode="center" :mask-close-able="false" :border-radius="20" :closeable="true" width="80%">
			<view style="padding: 40rpx;">
				<u-form :model="addFrom" :rules="rules" ref="addFrom" :error-type="errorType" :label-width='130' class="my-edit">
					<u-form-item label="备注:" prop="remarks">
						<u-input v-model="addFrom.remarks" type="textarea"/>
					</u-form-item>
				</u-form>
				
				<view style="display: flex;margin-top: 20rpx;">
					<u-button size="mini" @click="remarkShow = false">取消</u-button>
					<u-button type="primary" size="mini" @click="onSubmit">确认</u-button>
				</view>
			</view>
		</u-popup>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		props:{
			params:Object,
		},
		data() {
			return {
				isShow:false,
				fromValiData: {
					pageSize: 10,
					pageNow: 1
				},
				tableData: [],
				tableHeader:[
					{label:'用户名称',prop:'userName'},
					{label:'用户手机号码',prop:'userMobile'},
					{label:'评论内容',prop:'remarks'},
					{label:'评论时间',prop:'remarksTime'}
				],
				loadStatus: 'loadmore',
				scrollTop: 0,
				
				addFrom:{
					remarks:''
				},
				remarkShow:false,
				rules: {
					remarks: [{
						required: true,
						message: '请填写备注',
						trigger: 'change'
					}],
				},
				errorType: ['message'],
			}
		},
		methods: {
			onSubmit(){
				if(this.addFrom.remarks === ''){
					this.$refs.uToast.show({
						title: '请填写备注',
						type: 'warning'
					})
					return
				}
				this.addFrom.contId = this.params.id
				this.$u.api.msgApi.getContractRemarksAddRemarks(this.addFrom, this).then(res => {
					let pages = getCurrentPages() // 当前页面
					let beforePage = pages[pages.length - 2] //上一页
					// #ifdef H5
					beforePage.$refs.tableRef.$refs.uToast.show({
						title: '保存成功',
						type: 'success',
					})
					this.doSearch()
					// #endif
					// #ifndef H5
					beforePage.$vm.$refs.tableRef.$refs.uToast.show({
						title: '保存成功',
						type: 'success',
					})
					this.doSearch()
					// #endif
					this.remarkShow = false
				})
			},
			getListData() {
				this.fromValiData.contId = this.params.id
				this.$store.dispatch('setIsShow',true)
				this.$u.api.msgApi.getContractRemarksQueryPageData(this.fromValiData, this).then(res => {
					res.result.pageList.forEach(xdd => {
						switch (xdd.type) {
							case '1':
								xdd.typeName = '个人/政府'
								break
							case '2':
								xdd.typeName = '企业'
								break
						}
					})
					this.tableData = this.tableData.concat(res.result.pageList)
					this.fromValiData.dataSum = res.result.dataSum
					if (this.tableData.length >= this.fromValiData.dataSum) {
						this.loadStatus = 'nomore';
					}
					uni.stopPullDownRefresh()
				})
			},
			addRemark(){
				this.remarkShow = true
				this.addFrom.remarks = ''
			},
			doSearch() {
				this.fromValiData.pageNow = 1
				this.tableData = []
				this.getListData()
			},
		},
		onLoad() {
			
		},
		mounted() {
			this.getListData()
			let that = this
			uni.$on('onReachBottom',function(data){
				that.loadStatus = 'loading';
				if (that.tableData.length >= that.fromValiData.dataSum) {
					that.loadStatus = 'nomore';
				} else {
					that.loadStatus = 'loading';
					that.fromValiData.pageNow++
					that.getListData()
				}
			})
		},
	}
</script>

<style scoped lang="scss">

</style>
