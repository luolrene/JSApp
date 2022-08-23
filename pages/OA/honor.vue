<template>
	<view>
		<view style="height: 520rpx;position: relative;padding: 140rpx 100rpx 0 100rpx;">
			<image src="../../static/OA/home/honor_bk.png" mode="" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"></image>
			<swiper class="swiper">
				<swiper-item v-for="(item,index) in honorList" :key="index">
					<u-row gutter="16">
						<u-col span="4" style="display: flex;justify-content: center;margin-bottom: 30rpx;" v-for="(xdd,index2) in item" :key="index2">
							<image :src="xdd.image" mode="" style="width: 140rpx;height: 140rpx;"></image>
						</u-col>
					</u-row>
				</swiper-item>
			</swiper>
		</view>
		<u-gap height="20"></u-gap>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				honorList:[
					[{image: '../../static/OA/home/honor_A.jpg'},
					{image: '../../static/OA/home/honor_B.jpg'},
					{image: '../../static/OA/home/honor_C.jpg'},
					{image: '../../static/OA/home/honor_C.jpg'},
					{image: '../../static/OA/home/honor_A.jpg'},
					{image: '../../static/OA/home/honor_B.jpg'}],
					
					[{image: '../../static/OA/home/honor_A.jpg'},
					{image: '../../static/OA/home/honor_B.jpg'},
					{image: '../../static/OA/home/honor_C.jpg'},
					{image: '../../static/OA/home/honor_C.jpg'},
					{image: '../../static/OA/home/honor_A.jpg'},
					{image: '../../static/OA/home/honor_B.jpg'}]
				],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	
</style>