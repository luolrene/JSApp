<template>
	<my-pagge>
		<u-cell-group style="z-index: 1;">			
			<u-cell-item icon="" title="用户名" :value="$store.getters.userInfo_TAS.name" :arrow="false"></u-cell-item>
			<u-cell-item icon="" title="手机号" :value="$store.getters.userInfo_TAS.mobile" :arrow="false"></u-cell-item>
			<u-cell-item icon="" title="用户级别" :value="$store.getters.userInfo_TAS.lev" :arrow="false"></u-cell-item>
			<u-cell-item icon="" title="性别" :value="$store.getters.userInfo_TAS.sex" :arrow="false"></u-cell-item>
			<u-cell-item icon="" title="角色" :value="$store.getters.userInfo_TAS.roleName" :arrow="false"></u-cell-item>
			<u-cell-item icon="" title="职务" :value="$store.getters.userInfo_TAS.positionName" :arrow="false"></u-cell-item>
			<u-cell-item icon="" title="生日" :value="$store.getters.userInfo_TAS.birth" :arrow="false"></u-cell-item>
			<u-cell-item icon="" title="个性签名" :value="$store.getters.userInfo_TAS.selfSign" :arrow="false"></u-cell-item>
		</u-cell-group>
		<u-button type="error" style="margin-top: 20rpx;width: 96%;" @click="sheetShow = true">退出登录</u-button>
		<u-action-sheet :list="list" v-model="sheetShow" @click="getSheetValue"></u-action-sheet>
		<my-tabbar></my-tabbar>
	</my-pagge>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '退出',
					color: '#fa3534',
					fontSize: 28
				}],
				sheetShow: false,
			}
		},
		methods: {
			getSheetValue(index) {
				if (index === 0) {
					this.getLoginOut()
				}
			},
			getLoginOut() {
				this.$store.dispatch('setUserInfo', {}).then(res => {
					this.$u.api.loginApi.getUserLoginout({}, this).then(res => {
						this.$store.dispatch('setIsShow',false)
						this.$store.dispatch('setSystem', 'TAS')
					})
					uni.reLaunch({
						url: '../login'
					});
				})
			}
		},
		onReady() {
			
		}
	}
</script>

<style scoped lang="scss">
	// page {
	// 	margin: 0;
	// 	padding: 0;
	// 	min-height: 92vh;
	// 	position: relative;
	// 	background-color: rgb(118, 218, 255);
	// 	overflow: hidden;
	// }
	
	// page::before,
	// page::after {
	// 	content: '';
	// 	position: absolute;
	// 	bottom: 15vh;
	// 	min-width: 300vw;
	// 	min-height: 300vw;
	// 	background-color: #FFFFFF;
	// 	animation: rote 10s linear infinite;
	// }
	
	// page::before {
	// 	left: -95%;
	// 	border-radius: 45%;
	// 	opacity: .5;
	// }
	
	// page::after {
	// 	left: -95%;
	// 	border-radius: 46%;
	// }
	
	// @keyframes rote {
	// 	from {
	// 		transform: rotateZ(0);
	// 	}
	
	// 	to {
	// 		transform: rotateZ(360deg);
	// 	}
	// }
</style>
