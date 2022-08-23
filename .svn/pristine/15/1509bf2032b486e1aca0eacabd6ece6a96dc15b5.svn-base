<template>
	<view class="wrap">
		<block v-if="tableData.length > 0">
			<view class="tableClass" v-for="(item, index) in tableData" :key="index" @click="handleDetails(item)">
				<u-row gutter="16">
					<u-col span="9" clas="my-list-left">
						<view class="u-line-2 content" v-for="(xdd,index2) in tableHeader" :key="xdd.prop"
							style="margin-bottom: 6rpx;">
							<span v-if="index2 === 0" style="font-size: 30rpx;margin-bottom: 8rpx;display: inline-block;">{{index+1}}. <span v-if="xdd.isHead">{{xdd.label}}：</span> {{item[xdd.prop]}}</span>
							<span v-else>{{xdd.label}}：<span :style="{color:xdd.hasOwnProperty('conditionColor') ? xdd.conditionColor(item) : ''}">{{item[xdd.prop]}}</span></span>
						</view>
					</u-col>
					<u-col span="3" class="my-list-right">
						<u-button :type="xdd.type" size="mini" v-for="xdd in buttonList" :key="xdd.label" v-if="!xdd.hasOwnProperty('condition') || xdd.condition(item)"
							:style="{marginBottom:marginBottom}" @click="getButtonClick(xdd,item)">
							<span class="iconfont" v-if="xdd.icon !== '' && xdd.icon !== undefined">{{xdd.icon}}</span>
							<span v-else>{{xdd.label}}</span>
						</u-button>
					</u-col>
				</u-row>
			</view>
			
			<!-- 加载更多 -->
			<u-loadmore :status="loadStatus" v-if="isLoadmore"/>
			<!-- 移动至顶部 -->
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</block>		
		<my-empty v-else></my-empty>
		<!-- 消息提示框 -->
		<u-toast ref="uToast" :duration="1000"/>
	</view>
</template>

<script>
	export default {
		props: {
			obj: {
				type: Object
			},
			tableData: {
				type: Array,
				default: () => []
			},
			tableHeader: {
				type: Array,
				default: () => []
			},
			buttonList: {
				type: Array,
				default: () => []
			},
			loadStatus: {
				type: String,
				default: ''
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			isLoadmore:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				marginBottom: '10rpx'
			}
		},
		methods: {
			getButtonClick(xdd,item) {
				if (this.obj) {
					this.obj[xdd.click](item)
				} else {
					this.$parent[xdd.click](item)
				}
				// console.log(params)
			},
			handleDetails(item){
				this.$emit('handleDetails',item)
			}
		},
		onLoad() {

		},
		onShow() {

		},
		onReady() {

		}
	}
</script>

<style scoped lang="scss">
	.tableClass {
		padding: 30rpx 20rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;

		.my-list-left {
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			.content {
				width: 100%;
			}
		}

		.my-list-right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
</style>
