<template>
  <view>
  	<view v-for="(item,index) in options" :key="index" class="list">
			<view style="color: #909399;line-height: 50rpx;">
				{{item.operTime}}
			</view>
			<view class="title">
				<view style="font-weight: 700;">步骤{{item.step}}</view>
				<view style="color: #19BE6B;">同意</view>
			</view>
			<view class="content">
				<view>{{item.oper}}</view>
				<view>{{item.operMobile}}</view>
			</view>
			<view class="exp">
				<view>{{item.exp}}</view>
			</view>
		</view>
  </view>
</template>

<script>
export default {
	props:{
		options:{
			type:Array,
			default:()=>[]
		}
	},
  data () {
    return {

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
	.list{
		background-color: #FFFFFF;padding: 20rpx 30rpx;margin-bottom: 20rpx;
	}
	.title{
		display: flex;justify-content: space-between;line-height: 50rpx;
	}
	.content{
		display: flex;justify-content: space-between;line-height: 50rpx;
	}
	.exp{
		display: flex;line-height: 50rpx;
	}
</style>
