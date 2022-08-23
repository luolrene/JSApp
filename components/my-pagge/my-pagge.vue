<template>
	<view class="my-content">
		<slot></slot>
		<my-loadding v-show="this.$store.getters.isShow"></my-loadding>
	</view>
</template>

<script>
	export default {
		props:{
			isShow:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {

		},
	}
</script>

<style scoped lang="scss">

</style>
