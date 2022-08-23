<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" ref="fromValiData" :label-width='280' class="my-edit">
			<u-form-item label="项目名称:">
				<u-input v-model="fromValiData.proName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="客户名称:">
				<u-input v-model="fromValiData.custName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="报告编号:">
				<u-input v-model="fromValiData.reportNo" :disabled="true" placeholder="" />
			</u-form-item>
		</u-form>
		<view class="content">
			<view class="title">报告审核</view>
			<view class="exp">
				<span style="margin-right: 20rpx;">审核意见:</span>
				<u-radio-group v-model="params.option">
					<u-radio name="1">同意</u-radio>
					<u-radio name="0">拒绝</u-radio>
				</u-radio-group>
			</view>
			<view class="exp" v-show="params.option === '1' && fromValiData.status ==='1_1'">
				<span style="margin-right: 20rpx;">二审审核人员:</span>
				<u-input type="select" :select-open="userShow" v-model="params.secondCheckName"
					placeholder="请选择二审审核人员" @click="userShow = true"></u-input>
			</view>
		
			<view class="exp" v-show="params.option === '0'">
				<span style="margin-right: 20rpx;">拒绝原因:</span>
				<u-input v-model="params.returnReason" type="textarea" placeholder="请填写拒绝原因" :border='true' />
			</view>
			
			<!-- 二审审核人员选择器 -->
			<u-select mode="single-column" value-name="mobile" label-name="name" :list="userList" v-model="userShow"
				@confirm="getUserData">
			</u-select>
			<u-toast ref="uToast" />
		</view>
		
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				fromValiData: {},
				params: {},
				
				userShow:false,
				userList:[]
			}
		},
		methods: {
			getListData() {
				let ids = {
					pageSize: 9999,
					pageNow: 1,
					checkType: '2'
				}
				this.$u.api.msgApi.getUserQueryPageData(ids, this).then(res => {
					this.userList = res.result.pageList
				})
			},
			getUserData(params){
				this.params.secondCheck = params[0].value
				this.params.secondCheckName = params[0].label
			}
		},
		onLoad(params) {
			if (params.params) {
				this.fromValiData = JSON.parse(params.params)
			}
		},
		onReady() {
			this.getListData()
		},
		onNavigationBarButtonTap() {
			let name = ''
			let ids = JSON.parse(JSON.stringify(this.fromValiData))
			if(this.params.option === undefined){
				this.$refs.uToast.show({
					title: '请选择审核意见',
					type: 'warning'
				})
				return
			}
			if (this.params.option === '0') {
				name = '审核拒绝'
			  if (this.params.returnReason === undefined || this.params.returnReason === '') {
			    this.$refs.uToast.show({
						title: '请填写拒绝原因',
						type: 'warning'
					})
			    return
			  }
			  switch (this.fromValiData.status) {
			    case '1_1':
			      ids.firstOption = this.params.option
			      ids.returnReason = this.params.returnReason
			      break
			    case '1_2':
			      ids.secondOption = this.params.option
			      ids.returnReason = this.params.returnReason
			      break
			  }
			} else if (this.params.option === '1') {
				name = '审核通过'
			  switch (this.fromValiData.status) {
			    case '1_1':
			      if (this.params.secondCheck === undefined || this.params.secondCheck === null) {
							this.$refs.uToast.show({
								title: '请选择二审人员',
								type: 'warning'
							})
			        return
			      }
			      ids.secondCheck = this.params.secondCheck
			      ids.secondCheckName = this.params.secondCheckName
			      ids.firstOption = this.params.option
			      break
			    case '1_2':
			      ids.secondOption = this.params.option
			      break
			  }
			}
			let that = this
			let content = '此操作将提交' + name + '该合同，是否继续？'
			uni.showModal({
				title: '提示',
				content: content,
				success(res) {
					if (res.confirm) {
						that.$store.dispatch('setIsShow',true)
						that.$u.api.reportVerityApi.getReportEditCommitToCheck(ids, that).then(res => {
							let pages = getCurrentPages() // 当前页面
							let beforePage = pages[pages.length - 2] //上一页
							// #ifdef H5
							beforePage.$refs.tableRef.$refs.uToast.show({
								title: '提交成功',
								type: 'success',
							})
							beforePage.doSearch()
							// #endif
							// #ifndef H5
							beforePage.$vm.$refs.tableRef.$refs.uToast.show({
								title: '提交成功',
								type: 'success',
							})
							beforePage.$vm.doSearch()
							// #endif
							uni.navigateBack();
						})
					}
				}
			})
			console.log(ids)
		},
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		margin: 20rpx 0;
		background-color: #FFFFFF;
		padding: 40rpx 20rpx;

		.title {
			font-size: 38rpx;
			text-align: center;
			font-weight: 700;
			margin-bottom: 40rpx;
		}

		.exp {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
		}
	}
</style>
