<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" ref="fromValiData" :label-width='280' class="my-edit">
			<u-form-item label="项目名称:">
				<u-input v-model="fromValiData.proName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="客户名称:">
				<u-input v-model="fromValiData.custName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="旧合同金额:">
				<u-input v-model="fromValiData.oldMoney" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="新合同金额:">
				<u-input v-model="fromValiData.newMoney" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="变更描述:">
				<u-input v-model="fromValiData.changeDetail" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="流程名称:">
				<u-input v-model="fromValiData.checkPathName" :disabled="true" placeholder="" />
			</u-form-item>
		</u-form>
		<view class="content">
			<view class="title">合同变更审核</view>
			<view class="exp">
				<span style="margin-right: 20rpx;">审核备注:</span>
				<u-input v-model="params.exp" type="textarea" placeholder="请填写审核备注" :border='true' />
			</view>
			<view style="display: flex;">
				<u-button type="primary" size="medium" @click="onSubmit('1','审核通过')">同意</u-button>
				<u-button type="error" size="medium" @click="onSubmit('2','审核拒绝')">拒绝</u-button>
			</view>
		</view>
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				fromValiData: {},
				params: {}
			}
		},
		methods: {
			onSubmit(option, name) {
				let that = this
				let content = '此操作将提交' + name + '该合同，是否继续？'
				uni.showModal({
					title: '提示',
					content: content,
					success(res) {
						if (res.confirm) {
							that.params.option = option
							that.params.father = that.fromValiData.checkTask
							that.$store.dispatch('setIsShow',true)
							that.$u.api.contractVerityApi.getCheckTaskAddCheckLog(that.params, that).then(res => {

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
			}
		},
		onLoad(params) {
			if (params.params) {
				this.fromValiData = JSON.parse(params.params)

				this.fromValiData.iscycle = this.fromValiData.iscycle === '1' ? '是' : '否'
				this.fromValiData.istosub = this.fromValiData.istosub === '1' ? '是' : '否'
				this.fromValiData.ispj = this.fromValiData.ispj === '1' ? '是' : '否'
				this.fromValiData.needInvoice = this.fromValiData.needInvoice === '1' ? '是' : '否'
			}
		},
		onReady() {

		}
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
		.exp{
			display: flex;align-items: center;margin-bottom: 40rpx;
		}
	}
</style>
