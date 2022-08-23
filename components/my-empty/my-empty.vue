<template>
  <view style="height: 80vh;align-items: center;">
  	<u-empty :text="text" mode="list"></u-empty>
  </view>
</template>

<script>
export default {
	props: {
		text:{
			type:String,
			default:'暂无数据'
		}
	},
  data () {
    return {

    }
  },
  methods: {

  },
  onLoad () {
  	
  },
  onReady () {
  	
  }
}
</script>

<style scoped lang="scss">

</style>
