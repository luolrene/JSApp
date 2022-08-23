<template>
	<my-pagge :isShow="isShow">
		<u-form :model="fromValiData" ref="fromValiData" :label-width='280' class="my-edit">
			<u-form-item label="项目名称:">
				<u-input v-model="fromValiData.project" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="客户名称:">
				<u-input v-model="fromValiData.custName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="联系人姓名:">
				<u-input v-model="fromValiData.contacts" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="联系人手机:">
				<u-input v-model="fromValiData.contactsMobile" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="经办人姓名:">
				<u-input v-model="fromValiData.sellerName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="经办人手机:">
				<u-input v-model="fromValiData.seller" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="内勤姓名:">
				<u-input v-model="fromValiData.officeName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="内勤手机:">
				<u-input v-model="fromValiData.office" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="客户区域:">
				<u-input v-model="fromValiData.area" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="项目板块:">
				<u-input v-model="fromValiData.plateName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="项目类型:">
				<u-input v-model="fromValiData.projectTypeName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="付款方式:">
				<u-input v-model="fromValiData.payTypeName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="寄送方式:">
				<u-input v-model="fromValiData.mailTypeName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="审核流程:">
				<u-input v-model="fromValiData.checkPathName" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="是否周期合同:">
				<u-input v-model="fromValiData.iscycle" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="是否分包:">
				<u-input v-model="fromValiData.istosub" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="是否评价:">
				<u-input v-model="fromValiData.ispj" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="是否需要寄出发票:">
				<u-input v-model="fromValiData.needInvoice" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="采样期限时间:">
				<u-input v-model="fromValiData.cyTerm" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="项目期限:">
				<u-input v-model="fromValiData.proTerm" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="合同金额:">
				<u-input v-model="fromValiData.price" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="报告份数:">
				<u-input v-model="fromValiData.reportNum" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="检测地点:">
				<u-input v-model="fromValiData.checkAddress" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="备注1:">
				<u-input v-model="fromValiData.expOne" :disabled="true" placeholder="" />
			</u-form-item>
			<u-form-item label="备注2:">
				<u-input v-model="fromValiData.expTwo" :disabled="true" placeholder="" />
			</u-form-item>
		</u-form>
		<view class="content">
			<view class="title">合同审核</view>
			<view class="exp">
				<span style="margin-right: 20rpx;">审核备注:</span>
				<u-input v-model="params.exp" type="textarea" placeholder="请填写审核备注" :border='true' />
			</view>
			<view class="exp">
				<span style="margin-right: 20rpx;">颜色标注:</span>
				<u-input v-model="fromValiData.colorName" :border="true" placeholder="点击选择" @click="colorShow = true" :style="selectColor"/>
			</view>
			<view style="display: flex;">
				<u-button type="primary" size="medium" @click="onSubmit('1','审核通过')">同意</u-button>
				<u-button type="error" size="medium" @click="onSubmit('2','审核拒绝')">拒绝</u-button>
			</view>
			<u-select v-model="colorShow" :list="list" @confirm="getColor" style="background-color: red;"></u-select>
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
				
				colorShow: false,
				list: [
					{value: 'color_1',label: '红',style: 'color:red; background-color:red'},
					{value: 'color_2',label: '橙',style: 'color:#ff6600; background-color:#ff6600'},
					{value: 'color_3',label: '黄',style: 'color:#ffff00; background-color:#ffff00'},
					{value: 'color_4',label: '绿',style: 'color:#008000; background-color:#008000'},
					{value: 'color_5',label: '青',style: 'color:#008080; background-color:#008080'},
					{value: 'color_6',label: '蓝',style: 'color:#00ffff; background-color:#00ffff'},
					{value: 'color_7',label: '紫',style: 'color:#800080; background-color:#800080'},
					{value: 'color_8',label: '无',style: 'color:#fff; background-color:#fff'},
					{value: 'color_9',label: '灰',style: 'color:#c0c0c0; background-color:#c0c0c0'}
				],
				selectColor:''
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
							that.params.color = that.fromValiData.color
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
			},
			getColor(e){
				let obj = this.list.find(res=>{
					return res.value === e[0].value
				})
				if(e[0]){
					this.fromValiData.colorName = obj.label
					this.fromValiData.color = obj.value
					this.selectColor = obj.style
				}
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
	// ::v-deep .u-select__body__picker-view__item{
	// 	background-color: red;
	// }
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
