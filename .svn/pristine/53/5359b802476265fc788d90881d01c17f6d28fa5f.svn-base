<template>
  <view>
    <u-tabbar v-model="current" :show="show" :bg-color="bgColor" :border-top="borderTop" :list="list"
    	:mid-button="midButton" :inactive-color="inactiveColor" :activeColor="activeColor"></u-tabbar>
  </view>
</template>

<script>
export default {
  data () {
    return {
			current: 0,
			show: true,
			bgColor: '#ffffff',
			borderTop: true,
			list: [{
					iconPath: "/static/home/TAS_logo.png",
					selectedIconPath: "home-fill",
					text: '首页',
					pagePath: "/pages/views/home/home"
				}, {
						iconPath: "/static/home/OA_logo.png",
						selectedIconPath: "home-fill",
						text: '首页',
						pagePath: "/pages/OA/home"
				}, {
					iconPath: "file-text",
					selectedIconPath: "file-text-fill",
					text: '待办',
					pagePath: "/pages/views/home/info"
				}, {
					iconPath: "account",
					selectedIconPath: "account-fill",
					text: '我的',
					pagePath: "/pages/views/home/user"
				},
			],
			midButton: false,
			inactiveColor: '#909399',
			activeColor: '#5098FF'
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
	.u-demo-area {
		margin: 0 -40rpx;
	}
</style>
