<template>
	<my-pagge style="padding: 20rpx 10rpx;background-color: #ffffff;">
		<block v-for="(item,index) in tableData" :key="index">
			<view style="width: 2rpx;;height: 40rpx;border: 2px solid #4D72E4;border-radius: 20px; margin-right: 10rpx;display: inline;"></view>{{item.name}}
			<u-row style="padding-top: 30rpx;">
				<u-col
					@click="getToApply(xdd.id,xdd.name)"
					v-for="(xdd,index2) in item.children"
					:key="index2"
					span="4"
					class="cell"
					style="display: flex;flex-direction: column;height: 180rpx;">
					<image src="../../../../static/OA/application/cgsq.png" mode="" style="width: 80rpx;height: 80rpx;margin-bottom: 10rpx;"></image>
					<view style="text-align: center;">{{xdd.name}}</view>
				</u-col>
			</u-row>
		</block>
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				fromValiData:{
					processType: '1',
					id: 0
				},
				tableData:[]
			}
		},
		onLoad() {
			
		},
		onReady() {
			this.getListData()
		},
		onShow() {

		},
		methods: {
			getListData(){
				this.$store.dispatch('setIsShow',true)
				this.$u.api.myApplicationApi.getOaProcessGetChildrenTwo(this.fromValiData, this).then(res => {
					this.tableData = res.result
				})
			},
			getToApply(id,name){
				this.fromValiData.processId = id
				this.fromValiData.processName = name
				switch(name){
					case '借款申请':
						uni.navigateTo({
						    url: './edits/borrowMoeny'
						})
						break
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		font-size: 26rpx;
	}
</style>